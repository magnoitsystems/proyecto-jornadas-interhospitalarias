import { promises as fs } from 'fs';

interface PdfValidationResult {
	isValid: boolean;
	actualType?: string;
	reason?: string;
}

export class FileTypeValidator {
	private static readonly PDF_SIGNATURE = [0x25, 0x50, 0x44, 0x46];
	private static readonly PDF_MIME_TYPE = 'application/pdf';
	private static readonly PDF_EXTENSION = 'pdf';

	static async validatePdfFile(
		filePath: string,
		declaredMimeType: string,
		declaredExtension: string
	): Promise<PdfValidationResult> {
		console.log('Iniciando validación de archivo PDF');
		console.log('Archivo:', filePath);
		console.log('MIME declarado:', declaredMimeType);
		console.log('Extensión declarada:', declaredExtension);

		try {
			const fileHandle = await fs.open(filePath, 'r');
			const buffer = Buffer.alloc(16);
			await fileHandle.read(buffer, 0, 16, 0);
			await fileHandle.close();

			console.log('Primeros 16 bytes:',
				Array.from(buffer).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' ')
			);

			const hasPdfSignature = this.checkPdfSignature(buffer);

			if (!hasPdfSignature) {
				console.log('ERROR: Archivo no tiene firma PDF válida');
				return {
					isValid: false,
					reason: 'El archivo no es un PDF válido'
				};
			}

			if (declaredMimeType !== this.PDF_MIME_TYPE) {
				console.log('ERROR: MIME type incorrecto');
				return {
					isValid: false,
					reason: 'MIME type debe ser application/pdf'
				};
			}

			if (declaredExtension.toLowerCase() !== this.PDF_EXTENSION) {
				console.log('ERROR: Extensión incorrecta');
				return {
					isValid: false,
					reason: 'Extensión debe ser .pdf'
				};
			}

			console.log('Validación PDF exitosa');
			return { isValid: true, actualType: 'pdf' };

		} catch (error) {
			console.error('Error validando archivo PDF:', error);
			return {
				isValid: false,
				reason: 'Error técnico durante validación'
			};
		}
	}

	private static checkPdfSignature(buffer: Buffer): boolean {
		for (let i = 0; i < this.PDF_SIGNATURE.length; i++) {
			if (buffer[i] !== this.PDF_SIGNATURE[i]) {
				return false;
			}
		}
		return true;
	}

	static isValidPdfExtension(filename: string): boolean {
		const extension = filename.toLowerCase().split('.').pop();
		return extension === this.PDF_EXTENSION;
	}

	static isValidPdfMimeType(mimeType: string): boolean {
		return mimeType === this.PDF_MIME_TYPE;
	}
}