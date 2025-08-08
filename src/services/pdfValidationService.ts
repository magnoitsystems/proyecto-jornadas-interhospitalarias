interface PdfValidationResult {
	isValid: boolean;
	warnings: string[];
	blocker?: string;
}

export async function validatePdfSafety(file: File): Promise<PdfValidationResult> {
	const warnings: string[] = [];
	let blocker: string | undefined;

	try {
		const arrayBuffer = await file.arrayBuffer();
		const content = new TextDecoder('latin1').decode(arrayBuffer);

		// JavaScript embebido
		const dangerousJS = [
			'/JavaScript',  // Objeto JavaScript en PDF
			'/JS',          // Abreviación de JavaScript
			'app.alert',    // Alerts automáticos (típico malware)
			'this.submitForm', // Envío automático de datos
			'this.launchURL',  // Abrir URLs automáticamente
		];

		for (const pattern of dangerousJS) {
			if (content.includes(pattern)) {
				blocker = `Contiene código JavaScript peligroso: ${pattern}`;
				break;
			}
		}

		// URLs automáticas
		const autoUrls = [
			'/URI(',         // Enlaces automáticos
			'http://',       // URLs no seguras
		];

		for (const pattern of autoUrls) {
			if (content.includes(pattern)) {
				warnings.push(`Contiene enlaces automáticos: ${pattern}`);
			}
		}

		if (file.size > 5 * 1024 * 1024) { // 5MB
			blocker = '❌ Archivo demasiado grande para un documento médico';
		}

		if (file.size < 100) { // 100 bytes
			blocker = 'Archivo demasiado pequeño para ser un PDF válido';
		}

		return {
			isValid: !blocker,
			warnings,
			blocker
		};

	} catch (error) {
		return {
			isValid: false,
			warnings: [],
			blocker: '❌ Error al leer el archivo'
		};
	}
}

export async function isValidMedicalPdf(file: File): Promise<{
	accept: boolean;
	message: string;
	details?: string[];
}> {
	if (!file.name.toLowerCase().endsWith('.pdf')) {
		return { accept: false, message: 'Solo se permiten archivos PDF' };
	}

	if (file.type !== 'application/pdf') {
		return { accept: false, message: 'Tipo de archivo inválido' };
	}

	// Validación de seguridad
	const safety = await validatePdfSafety(file);

	if (!safety.isValid) {
		return {
			accept: false,
			message: safety.blocker || 'Archivo no válido',
			details: safety.warnings
		};
	}

	// Si tiene warnings pero no blockers, aceptar con advertencia
	if (safety.warnings.length > 0) {
		return {
			accept: true,
			message: 'Archivo aceptado con advertencias',
			details: safety.warnings
		};
	}

	return { accept: true, message: 'PDF válido y seguro' };
}