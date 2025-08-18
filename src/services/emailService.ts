import { Resend } from 'resend';

// Función para validar la configuración
const validateConfig = () => {
	const apiKey = process.env.RESEND_API_KEY;
	const emailFrom = process.env.EMAIL_FROM;

	console.log('🔍 Validando configuración de email...');
	console.log('API Key presente:', !!apiKey);
	console.log('Email From:', emailFrom);

	if (!apiKey || apiKey === 'tu_api_key_de_resend') {
		throw new Error('RESEND_API_KEY no está configurada correctamente en las variables de entorno');
	}

	if (!emailFrom || emailFrom === 'tu-email@tudominio.com') {
		throw new Error('EMAIL_FROM no está configurada correctamente en las variables de entorno');
	}

	// Validar que no sea un email de Gmail/Yahoo/etc para evitar errores
	if (emailFrom.includes('@gmail.com') || emailFrom.includes('@yahoo.com') || emailFrom.includes('@hotmail.com')) {
		throw new Error(`EMAIL_FROM no puede ser un email personal (${emailFrom}). Usa 'onboarding@resend.dev' para pruebas o configura tu propio dominio.`);
	}

	return { apiKey, emailFrom };
};

// Crear instancia de Resend con validación
const createResendInstance = () => {
	const { apiKey } = validateConfig();
	return new Resend(apiKey);
};

export class EmailService {
	static async sendPasswordEmail(
		email: string,
		name: string,
		password: string
	): Promise<boolean> {
		try {
			console.log('📧 Iniciando envío de contraseña...');
			console.log('📧 Destinatario:', email);
			console.log('👤 Nombre:', name);

			// Validar configuración
			const { emailFrom } = validateConfig();
			const resend = createResendInstance();

			console.log('✅ Configuración validada');
			console.log('📤 Enviando desde:', emailFrom);
			console.log('📬 Enviando a:', email);

			const emailData = {
				from: emailFrom,
				to: email,
				subject: 'Tu contraseña de acceso - Jornadas interhospitalarias',
				html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
						<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
							<h1 style="color: white; margin: 0; font-size: 24px;">Jornadas Interhospitalarias</h1>
						</div>
						
						<div style="background: #f9fafb; padding: 30px; border-radius: 10px; border-left: 4px solid #667eea;">
							<h2 style="color: #1f2937; margin-top: 0;">¡Bienvenido/a ${name}!</h2>
							<p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
								Tu registro en las Jornadas Interhospitalarias ha sido exitoso.
							</p>
							<div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
								<p style="color: #374151; font-size: 14px; margin: 0;">Tu contraseña de acceso es:</p>
								<p style="color: #1f2937; font-size: 20px; font-weight: bold; margin: 10px 0; padding: 10px; background: #f3f4f6; border-radius: 6px; text-align: center; font-family: monospace;">
									${password}
								</p>
							</div>
							<p style="color: #6b7280; font-size: 14px;">
								Guarda esta contraseña en un lugar seguro. La necesitarás para acceder a tu cuenta.
							</p>
						</div>
						
						<div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
							<p style="color: #9ca3af; font-size: 12px; margin: 0;">
								© 2025 Jornadas Interhospitalarias. Este es un email automático.
							</p>
						</div>
					</div>
				`
			};

			console.log('📡 Enviando email...');

			const { data, error } = await resend.emails.send(emailData);

			if (error) {
				console.error('❌ Error de Resend:', error);
				console.error('❌ Error completo:', JSON.stringify(error, null, 2));
				throw new Error(`Error de Resend: ${error.message || JSON.stringify(error)}`);
			}

			if (!data?.id) {
				console.error('❌ Resend no devolvió ID de email');
				console.error('❌ Data recibida:', data);
				throw new Error('Email enviado pero sin confirmación de ID');
			}

			console.log('✅ Email enviado exitosamente');
			console.log('📧 ID del email:', data.id);
			return true;

		} catch (error) {
			console.error('💥 Error crítico en sendPasswordEmail:');

			if (error instanceof Error) {
				console.error('💥 Mensaje:', error.message);
				console.error('💥 Stack:', error.stack);
			} else {
				console.error('💥 Error desconocido:', error);
			}

			// Re-throw para que el caller pueda manejar el error específico
			throw error;
		}
	}

	static async sendWorkSubmissionConfirmation(
		email: string,
		name: string,
		workTitle: string,
		category: string,
		hasPrize: boolean = false
	): Promise<boolean> {
		try {
			console.log('📧 Iniciando envío de confirmación de trabajo...');

			// Validar configuración
			const { emailFrom } = validateConfig();
			const resend = createResendInstance();

			const { data, error } = await resend.emails.send({
				from: emailFrom,
				to: email,
				subject: `Trabajo recibido: "${workTitle}"`,
				html: `
					<!DOCTYPE html>
					<html>
					<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
					</head>
					<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
						<div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
							
							<!-- Header -->
							<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
								<h1 style="color: white; margin: 0; font-size: 28px; font-weight: 300;">
									Jornadas Interhospitalarias
								</h1>
								<p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
									Trabajo recibido exitosamente
								</p>
							</div>

							<!-- Content -->
							<div style="padding: 40px 30px;">
								<div style="text-align: center; margin-bottom: 30px;">
									<div style="background-color: #10b981; color: white; width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 36px; margin-bottom: 20px;">
										✓
									</div>
									<h2 style="color: #1f2937; margin: 0; font-size: 24px; font-weight: 600;">
										¡Perfecto, ${name}!
									</h2>
									<p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">
										Tu trabajo ha sido recibido correctamente
									</p>
								</div>

								<!-- Work Details Card -->
								<div style="background-color: #f9fafb; border-radius: 12px; padding: 25px; margin: 25px 0; border-left: 4px solid #667eea;">
									<h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
										Detalles del trabajo
									</h3>
									<div style="space-y: 10px;">
										<p style="margin: 8px 0; color: #4b5563; font-size: 14px;">
											<strong style="color: #1f2937;">Título:</strong> ${workTitle}
										</p>
										<p style="margin: 8px 0; color: #4b5563; font-size: 14px;">
											<strong style="color: #1f2937;">Categoría:</strong> ${category}
										</p> 
										<p style="margin: 8px 0; color: #4b5563; font-size: 14px;">
											<strong style="color: #1f2937;">Fecha de envío:</strong> ${new Date().toLocaleDateString('es-ES', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				})}
										</p>
										${hasPrize ? `
										<div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 12px; margin-top: 15px;">
											<p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
												Trabajo enviado para consideración de premio
											</p>
										</div>
										` : ''}
									</div>
								</div>

								<!-- Next Steps -->
								<div style="background-color: #eff6ff; border-radius: 12px; padding: 25px; margin: 25px 0;">
									<h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
										 ¿Qué sigue ahora?
									</h3>
									<ul style="color: #3730a3; margin: 0; padding-left: 20px; line-height: 1.6;">
										<li style="margin-bottom: 8px;">El comité científico evaluará tu trabajo</li>
										<li style="margin-bottom: 8px;">Recibirás una notificación sobre el estado de tu envío</li>
										<li style="margin-bottom: 8px;">Los trabajos aceptados serán publicados en el programa</li>
										${hasPrize ? '<li style="margin-bottom: 8px;"><strong>Tu trabajo será considerado para premio especial</strong></li>' : ''}
									</ul>
								</div>

								<!-- Contact Info -->
								<div style="border-top: 1px solid #e5e7eb; padding-top: 25px; text-align: center;">
									<p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
										¿Tienes preguntas? Contacta con nosotros:
									</p>
									<p style="color: #4f46e5; font-size: 14px; margin: 0;">
										jornadas_pediatricas@sisptandil.gob.ar
									</p>
								</div>
							</div>

							<!-- Footer -->
							<div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
								<p style="color: #9ca3af; font-size: 12px; margin: 0;">
									© 2025 Jornadas Interhospitalarias. Todos los derechos reservados.
								</p>
								<p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
									Este es un email automático, por favor no respondas directamente.
								</p>
							</div>
						</div>
					</body>
					</html>
				`
			});

			if (error) {
				console.error('❌ Error de Resend en confirmación:', error);
				throw new Error(`Resend error: ${error.message || JSON.stringify(error)}`);
			}

			if (!data?.id) {
				throw new Error('Email enviado pero sin un id retornado');
			}

			console.log('✅ Email de confirmación enviado exitosamente');
			return true;

		} catch (error) {
			console.error('💥 Error enviando confirmación de trabajo:', error);
			throw error;
		}
	}
}