import { EmailService } from '../src/services/emailService.ts';

async function testEmailSubmission() {
	console.log('Iniciando test de email...');

	try {
		const result = await EmailService.sendWorkSubmissionConfirmation(
			'laplacegian@gmail.com',
			'Juan Pérez',
			'Análisis de Casos Clínicos en Cardiología',
			'Cardiología',
			false
		);

		console.log('Email sin premio enviado:', result ? 'SUCCESS' : 'FAILED');

		const resultWithPrize = await EmailService.sendWorkSubmissionConfirmation(
			'test@example.com',
			'María González',
			'Innovaciones en Cirugía Mínimamente Invasiva',
			'Cirugía',
			true
		);

		console.log('Email con premio enviado:', resultWithPrize ? 'SUCCESS' : 'FAILED');

	} catch (error) {
		console.error('Error en el test:', error);
	}
}

await testEmailSubmission();