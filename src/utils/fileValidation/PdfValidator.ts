import { exec } from 'child_process';
import { promisify } from 'util';

interface PdfSecurityResult {
	isSecure: boolean;
	issues: string[];
	details: {
		hasJavaScript: boolean;
		hasInteractiveForms: boolean;
		externalLinksCount: number;
		isEncrypted: boolean;
		hasAttachments: boolean;
	};
}

export class PdfValidator {
	private static readonly execAsync = promisify(exec);

	static async validatePdfSecurity(filePath: string): Promise<PdfSecurityResult> {
		console.log('Validando seguridad de PDF:', filePath);

		const issues: string[] = [];
		const details = {
			hasJavaScript: false,
			hasInteractiveForms: false,
			externalLinksCount: 0,
			isEncrypted: false,
			hasAttachments: false
		};

		try {
			const { stdout: pdfInfo } = await this.execAsync(`pdfinfo "${filePath}"`);
			console.log('PDF Info obtenida exitosamente');

			details.hasJavaScript = await this.containsJavaScript(filePath);
			if (details.hasJavaScript) {
				issues.push('Contiene JavaScript embebido');
				console.log('WARNING: PDF contiene JavaScript');
			}

			details.hasInteractiveForms = await this.containsInteractiveForms(filePath);
			if (details.hasInteractiveForms) {
				issues.push('Contiene formularios interactivos');
				console.log('WARNING: PDF contiene formularios');
			}

			const externalLinks = await this.extractExternalLinks(filePath);
			details.externalLinksCount = externalLinks.length;
			if (externalLinks.length > 0) {
				issues.push(`Contiene ${externalLinks.length} enlaces externos`);
				console.log('WARNING: PDF contiene enlaces:', externalLinks.slice(0, 3));
			}

			details.isEncrypted = this.checkEncryption(pdfInfo);
			if (details.isEncrypted) {
				issues.push('PDF está encriptado o protegido');
				console.log('WARNING: PDF encriptado');
			}

			details.hasAttachments = await this.containsAttachments(filePath);
			if (details.hasAttachments) {
				issues.push('Contiene archivos adjuntos embebidos');
				console.log('WARNING: PDF contiene attachments');
			}

			const isSecure = issues.length === 0;
			console.log(`PDF security check completo. Seguro: ${isSecure}`);

			return {
				isSecure,
				issues,
				details
			};

		} catch (error) {
			console.error('Error validando PDF:', error);
			return {
				isSecure: false,
				issues: ['Error técnico durante validación'],
				details
			};
		}
	}

	private static async containsJavaScript(filePath: string): Promise<boolean> {
		try {
			const { stdout } = await this.execAsync(`strings "${filePath}" | grep -i "javascript\\|/js"`);
			return stdout.trim().length > 0;
		} catch {
			return false;
		}
	}

	private static async containsInteractiveForms(filePath: string): Promise<boolean> {
		try {
			const { stdout } = await this.execAsync(`strings "${filePath}" | grep -i "acroform\\|widget\\|/tx\\|/ch"`);
			return stdout.trim().length > 0;
		} catch {
			return false;
		}
	}

	private static async extractExternalLinks(filePath: string): Promise<string[]> {
		try {
			const { stdout } = await this.execAsync(`strings "${filePath}" | grep -oE 'https?://[^\\s"<>]+' | head -20`);
			return stdout.trim().split('\n').filter(link => link.length > 0);
		} catch {
			return [];
		}
	}

	private static checkEncryption(pdfInfo: string): boolean {
		return pdfInfo.includes('Encrypted:') && !pdfInfo.includes('Encrypted: no');
	}

	private static async containsAttachments(filePath: string): Promise<boolean> {
		try {
			const { stdout } = await this.execAsync(`strings "${filePath}" | grep -i "embeddedfile\\|filespec"`);
			return stdout.trim().length > 0;
		} catch {
			return false;
		}
	}

	static async extractBasicMetadata(filePath: string): Promise<any> {
		try {
			const { stdout } = await this.execAsync(`pdfinfo "${filePath}"`);
			const metadata: any = {};

			stdout.split('\n').forEach(line => {
				const [key, ...valueParts] = line.split(':');
				if (key && valueParts.length > 0) {
					const value = valueParts.join(':').trim();
					metadata[key.trim()] = value;
				}
			});

			return metadata;
		} catch (error) {
			console.error('Error extrayendo metadata:', error);
			return {};
		}
	}
}