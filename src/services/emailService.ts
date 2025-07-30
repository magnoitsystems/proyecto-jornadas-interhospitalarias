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
}