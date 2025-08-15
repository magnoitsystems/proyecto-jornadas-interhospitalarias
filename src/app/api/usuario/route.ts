import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/userService';
import { prisma } from '@/libs/prisma';
// import { Prisma } from "@prisma/client";
import { EmailService } from "@/services/emailService";

export async function POST(request: NextRequest) {
	let createdUserId: number | null = null;

	try {
		// Validar datos de entrada
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
			return NextResponse.json(
				{
					message: 'Error de validación',
					errors: result.errors || 'Datos de usuario inválidos'
				},
				{ status: 400 }
			);
		}

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
			console.log(`Usuario creado en DB: ${createdUser.idUser}`);

		} catch (dbError) {
			console.error('Error al crear usuario en DB:', dbError);

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

		// Enviar email con contraseña
		try {
			const emailSent = await EmailService.sendPasswordEmail(
				result.user.email,
				`${result.user.name} ${result.user.lastname}`,
				result.plainPassword!
			);

			if (!emailSent) {
				throw new Error('EmailService retornó false');
			}

			console.log('Email enviado exitosamente');

			return NextResponse.json(
				{
					message: 'Usuario creado exitosamente. Revisa tu email para obtener tu contraseña.',
					user: createdUser
				},
				{ status: 201 }
			);

		} catch (emailError) {
			console.error('Error crítico al enviar email:', emailError);

			// Rollback: eliminar usuario creado si email falla
			try {
				await prisma.user.delete({
					where: { idUser: createdUserId! }
				});
				console.log(`Rollback exitoso: Usuario ${createdUserId} eliminado`);

				return NextResponse.json(
					{
						message: 'Error temporal del servicio de email. Por favor intenta nuevamente.',
						errors: 'El registro no pudo completarse debido a problemas de email.'
					},
					{ status: 503 }
				);
			} catch (rollbackError) {
				console.error('Error en rollback:', rollbackError);

				// Log para investigación manual
				console.error(`Usuario órfano creado: ID ${createdUserId}, Email: ${result.user.email}`);

				return NextResponse.json(
					{
						message: 'Error crítico del sistema. Contacta al administrador.',
						supportInfo: {
							errorCode: 'ORPHAN_USER_CREATED',
							userId: createdUserId,
							timestamp: new Date().toISOString()
						}
					},
					{ status: 500 }
				);
			}
		}

	} catch (error) {
		console.error('Error general en POST /api/usuario:', error);

		// Log detallado para debugging
		const errorLog = {
			message: error instanceof Error ? error.message : 'Unknown error',
			stack: error instanceof Error ? error.stack : undefined,
			timestamp: new Date().toISOString(),
			userId: createdUserId
		};
		console.error('Error details:', errorLog);

		return NextResponse.json(
			{
				message: 'Error interno del servidor',
				errorCode: 'INTERNAL_SERVER_ERROR'
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
    } = {admin: false};

    if (genderFilters.length > 0) {
        filters.gender = {in: genderFilters};
    }
    if (jobFilters.length > 0) {
        filters.job = {in: jobFilters};
    }
    try {
        const responseUser = await prisma.user.findMany({where: filters})
        return NextResponse.json({responseUser});
    }

    catch(error){
	    console.error('API Error:', error);
	    return NextResponse.json({ message: 'Error interno del servidor' },{status:500});
	}
}