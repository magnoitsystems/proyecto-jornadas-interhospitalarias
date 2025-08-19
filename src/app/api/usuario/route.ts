import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';
import { prisma } from '@/libs/prisma';
import { EmailService } from "@/services/emailService";

export async function POST(request: NextRequest) {
	let createdUserId: number | null = null;

	try {
		let userData;
		try {
			userData = await request.json();
		} catch {
			return NextResponse.json(
				{ message: 'Formato de datos inválido' },
				{ status: 400 }
			);
		}

		const userService = new UserService();
		const result = await userService.validateUser(userData);

		if (!result.success || !result.user) {
			console.log('❌ Validación falló:', result.errors);
			return NextResponse.json(
				{
					message: 'Error de validación',
					errors: result.errors || 'Datos de usuario inválidos'
				},
				{ status: 400 }
			);
		}

		console.log('✅ Usuario validado correctamente');
		console.log('🔑 Contraseña generada:', result.plainPassword ? 'Sí' : 'No');

		// Crear usuario en base de datos
		let createdUser;
		try {
			createdUser = await prisma.user.create({
				data: {
					name: result.user.name,
					lastname: result.user.lastname,
					email: result.user.email,
					password: result.user.password,
					job: result.user.job,
					specialty: result.user.specialty,
					admin: result.user.admin || false,
					age: result.user.age,
					gender: result.user.gender
				},
				select: {
					idUser: true,
					name: true,
					lastname: true,
					email: true,
					job: true,
					specialty: true,
					admin: true,
					age: true,
					gender: true
				}
			});

			createdUserId = createdUser.idUser;

			console.log(`✅ Usuario creado en DB: ${createdUser.idUser}`);

		} catch (dbError) {
			console.error('❌ Error al crear usuario en DB:', dbError);

			// Manejo específico de errores de duplicación
			if (dbError instanceof Error && dbError.message.includes('Unique constraint')) {
				return NextResponse.json(
					{
						message: 'Error de validación',
						errors: [{ field: 'email', message: 'El email ya está registrado' }]
					},
					{ status: 409 }
				);
			}

			return NextResponse.json(
				{ message: 'Error interno del servidor al crear usuario' },
				{ status: 500 }
			);
		}

		// Envío de email
		try {
			console.log('📧 Iniciando envío de email...');
			await EmailService.sendPasswordEmail(
				result.user.email,
				`${result.user.name} ${result.user.lastname}`,
				result.plainPassword!
			);

			console.log('✅ Email enviado exitosamente');
			return NextResponse.json(
				{
					message: 'Usuario creado exitosamente. Revisa tu email para obtener tu contraseña.',
					user: createdUser
				},
				{ status: 201 }
			);

		} catch (emailError) {
			console.error('❌ Error crítico al enviar email:', emailError);

			// Log detallado del error de email
			if (emailError instanceof Error) {
				console.error('❌ Email error message:', emailError.message);
				console.error('❌ Email error stack:', emailError.stack);
			}

			// Determinar si el error es de configuración o temporal
			const isConfigError = emailError instanceof Error && (
				emailError.message.includes('configurada') ||
				emailError.message.includes('EMAIL_USER') ||
				emailError.message.includes('EMAIL_APP_PASSWORD') ||
				emailError.message.includes('@gmail.com') ||
				emailError.message.includes('@yahoo.com') ||
				emailError.message.includes('@hotmail.com')
			);

			if (isConfigError) {
				// Error de configuración - no hacer rollback, el usuario se creó correctamente
				console.log('⚠️ Error de configuración de email - Usuario mantenido en DB');
				return NextResponse.json(
					{
						message: 'Usuario creado exitosamente, pero hay un problema con la configuración del email.',
						errors: 'El administrador ha sido notificado. Tu cuenta está activa pero no recibirás el email con la contraseña por ahora.',
						user: createdUser,
						configError: true,
						adminNote: emailError.message
					},
					{ status: 201 } // 201 porque el usuario se creó exitosamente
				);
			}

			// Error temporal del servicio - hacer rollback
			console.log('⚠️ Error temporal de email - Iniciando rollback del usuario...');

			try {
				await prisma.user.delete({
					where: { idUser: createdUserId! }
				});
				console.log(`✅ Rollback exitoso: Usuario ${createdUserId} eliminado`);

				return NextResponse.json(
					{
						message: 'Error temporal del servicio de email. Por favor intenta registrarte nuevamente.',
						errors: 'El registro no pudo completarse. Intenta nuevamente en unos minutos.',
						emailError: emailError instanceof Error ? emailError.message : 'Error desconocido'
					},
					{ status: 503 }
				);
			} catch (rollbackError) {
				console.error('❌ Error en rollback:', rollbackError);

				// Log crítico para investigación manual
				console.error(`🔴 USUARIO ÓRFANO CREADO: ID ${createdUserId}, Email: ${result.user.email}`);
				console.error('🔴 Email error:', emailError instanceof Error ? emailError.message : 'Unknown');
				console.error('🔴 Rollback error:', rollbackError instanceof Error ? rollbackError.message : 'Unknown');

				return NextResponse.json(
					{
						message: 'Error crítico del sistema. Contacta al administrador inmediatamente.',
						supportInfo: {
							errorCode: 'ORPHAN_USER_CREATED',
							userId: createdUserId,
							userEmail: result.user.email,
							timestamp: new Date().toISOString(),
							emailError: emailError instanceof Error ? emailError.message : 'Unknown error',
							rollbackError: rollbackError instanceof Error ? rollbackError.message : 'Unknown rollback error'
						}
					},
					{ status: 500 }
				);
			}
		}

	} catch (error) {
		console.error('❌ Error general en POST /api/usuario:', error);

		// Log detallado para debugging
		const errorLog = {
			message: error instanceof Error ? error.message : 'Unknown error',
			stack: error instanceof Error ? error.stack : undefined,
			timestamp: new Date().toISOString(),
			userId: createdUserId
		};
		console.error('❌ Error details:', errorLog);

		return NextResponse.json(
			{
				message: 'Error interno del servidor',
				errorCode: 'INTERNAL_SERVER_ERROR',
				debug: process.env.NODE_ENV === 'development' ? errorLog : undefined
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const genderFilters = searchParams.getAll('gender');
	const jobFilters = searchParams.getAll('job');

	const filters: {
		admin?: boolean;
		gender?: { in: string[] };
		job?: { in: string[] };
	} = { admin: false };

	if (genderFilters.length > 0) {
		filters.gender = { in: genderFilters };
	}
	if (jobFilters.length > 0) {
		filters.job = { in: jobFilters };
	}

	try {
		const responseUser = await prisma.user.findMany({ where: filters });
		return NextResponse.json({ responseUser });
	} catch (error) {
		console.error('❌ API Error:', error);
		return NextResponse.json(
			{ message: 'Error interno del servidor' },
			{ status: 500 }
		);
	}
}