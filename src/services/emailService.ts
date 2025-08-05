import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
	static async sendPasswordEmail(
		email: string,
		name: string,
		password: string
	): Promise<boolean> {
		try {

			// Verificar configuración
			if (!process.env.RESEND_API_KEY)
				return false;

			if (!process.env.EMAIL_FROM)
				return false;

			const { data, error } = await resend.emails.send({
				from: process.env.EMAIL_FROM!,
				to: email,
				subject: 'Tu contraseña de acceso - Jornadas interhospitalarias',
				html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px;">
                        <h2>Bienvenido/a ${name}</h2>
                        <p>Tu contraseña es: <strong>${password}</strong></p>
                    </div>
                `
			});

			if (error)
				return false;

			return !!data?.id;

		} catch (error) {
			console.error('Error en el Email service:', error);
			return false;
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
			if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
				return false;
			}

			const { data, error } = await resend.emails.send({
				from: process.env.EMAIL_FROM!,
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
                                        ¿Tenes preguntas? Contacta con nosotros:
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

			return !error && !!data?.id;
		} catch (error) {
			console.error('Error enviando confirmación de trabajo:', error);
			return false;
		}
	}
}