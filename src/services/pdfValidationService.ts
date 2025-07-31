import { AntivirusScanner } from '@/utils/fileValidation/antiVirusScanner';
import { FileTypeValidator } from '@/utils/fileValidation/fileTypeValidation';
import { PdfValidator } from '@/utils/fileValidation/PdfValidator';
import { SandboxProcessor } from '@/utils/fileValidation/SandBoxProcessor';
import { SecureStorage } from '@/utils/fileValidation/SecureStorage';
import { promises as fs } from 'fs';
import path from 'path';

interface ValidationStep {
	name: string;
	success: boolean;
	duration: number;
	details?: any;
	errors?: string[];
}

export interface CompleteValidationResult {
	isValid: boolean;
	allErrors: string[];
	criticalErrors: string[];
	warningErrors: string[];
	steps: ValidationStep[];
	secureStorage?: {
		fileId: string;
		downloadToken: string;
		storagePath: string;
	};
	metadata: {
		originalName: string;
		fileSize: number;
		checksum: string;
		validationDate: string;
		authorId: string;
	};
}

export class PdfValidationService {
	private tempDir = '/tmp/pdf_upload_analysis';

	async validateAndStore(
		file: Blob,
		fileName: string,
		authorId: string
	): Promise<CompleteValidationResult> {

		const result: CompleteValidationResult = {
			isValid: false,
			allErrors: [],
			criticalErrors: [],
			warningErrors: [],
			steps: [],
			metadata: {
				originalName: fileName,
				fileSize: 0,
				checksum: '',
				validationDate: new Date().toISOString(),
				authorId
			}
		};

		let tempFilePath: string | null = null;

		try {
			// Paso 1: Crear archivo temporal y validación básica
			const bufferResult = await this.createTempFileFromBlob(file, fileName);
			tempFilePath = bufferResult.tempPath;
			result.metadata.fileSize = bufferResult.buffer.length;
			result.metadata.checksum = bufferResult.checksum;

			// Paso 2: Validación de tipo de archivo
			const typeValidation = await this.runTypeValidation(tempFilePath, fileName);
			result.steps.push(typeValidation);
			if (!typeValidation.success) {
				result.criticalErrors.push(...(typeValidation.errors || []));
			}

			// Paso 3: Escaneo antivirus
			const antivirusValidation = await this.runAntivirusValidation(tempFilePath);
			result.steps.push(antivirusValidation);
			if (!antivirusValidation.success) {
				result.criticalErrors.push(...(antivirusValidation.errors || []));
			}

			// Paso 4: Validación de seguridad PDF
			const securityValidation = await this.runSecurityValidation(tempFilePath);
			result.steps.push(securityValidation);
			if (!securityValidation.success) {
				// Algunos problemas de seguridad son warnings, no críticos
				if (securityValidation.details?.issues?.includes('JavaScript')) {
					result.criticalErrors.push(...(securityValidation.errors || []));
				} else {
					result.warningErrors.push(...(securityValidation.errors || []));
				}
			}

			// Paso 5: Procesamiento sandbox
			const sandboxValidation = await this.runSandboxValidation(tempFilePath);
			result.steps.push(sandboxValidation);
			if (!sandboxValidation.success) {
				result.criticalErrors.push(...(sandboxValidation.errors || []));
			}

			// Paso 6: Almacenamiento seguro (solo si no hay errores críticos)
			if (result.criticalErrors.length === 0) {
				const storageValidation = await this.runSecureStorage(bufferResult.buffer, fileName, authorId);
				result.steps.push(storageValidation);
				if (storageValidation.success && storageValidation.details) {
					result.secureStorage = storageValidation.details;
				}
			}

			// Determinar si la validación general es exitosa
			result.isValid = result.criticalErrors.length === 0;
			result.allErrors = [...result.criticalErrors, ...result.warningErrors];

			return result;

		} catch (error) {
			result.criticalErrors.push(`Error general: ${error.message}`);
			result.allErrors = result.criticalErrors;
			return result;

		} finally {
			// Limpiar archivo temporal
			if (tempFilePath) {
				await this.cleanupTempFile(tempFilePath);
			}
		}
	}

	private async createTempFileFromBlob(file: Blob, fileName: string) {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		await fs.mkdir(this.tempDir, { recursive: true });
		const tempPath = path.join(this.tempDir, `temp_${Date.now()}_${fileName}`);
		await fs.writeFile(tempPath, buffer);

		const crypto = await import('crypto');
		const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

		return { tempPath, buffer, checksum };
	}

	private async runTypeValidation(filePath: string, fileName: string): Promise<ValidationStep> {
		const startTime = Date.now();

		try {
			const result = await FileTypeValidator.validatePdfFile(
				filePath,
				'application/pdf',
				'pdf'
			);

			return {
				name: 'File Type Validation',
				success: result.isValid,
				duration: Date.now() - startTime,
				details: result,
				errors: result.isValid ? [] : [result.reason || 'Invalid PDF type']
			};

		} catch (error) {
			return {
				name: 'File Type Validation',
				success: false,
				duration: Date.now() - startTime,
				errors: [`Type validation failed: ${error.message}`]
			};
		}
	}

	private async runAntivirusValidation(filePath: string): Promise<ValidationStep> {
		const startTime = Date.now();

		try {
			const result = await AntivirusScanner.scanPdfFile(filePath);

			return {
				name: 'Antivirus Scan',
				success: result.isClean,
				duration: Date.now() - startTime,
				details: result,
				errors: result.isClean ? [] : [`Threat detected: ${result.threatFound}`]
			};

		} catch (error) {
			return {
				name: 'Antivirus Scan',
				success: false,
				duration: Date.now() - startTime,
				errors: [`Antivirus scan failed: ${error.message}`]
			};
		}
	}

	private async runSecurityValidation(filePath: string): Promise<ValidationStep> {
		const startTime = Date.now();

		try {
			const result = await PdfValidator.validatePdfSecurity(filePath);

			return {
				name: 'PDF Security Check',
				success: result.isSecure,
				duration: Date.now() - startTime,
				details: result,
				errors: result.isSecure ? [] : result.issues
			};

		} catch (error) {
			return {
				name: 'PDF Security Check',
				success: false,
				duration: Date.now() - startTime,
				errors: [`Security validation failed: ${error.message}`]
			};
		}
	}

	private async runSandboxValidation(filePath: string): Promise<ValidationStep> {
		const startTime = Date.now();

		try {
			const result = await SandboxProcessor.processInSandbox(filePath);

			return {
				name: 'Sandbox Processing',
				success: result.success,
				duration: Date.now() - startTime,
				details: result,
				errors: result.success ? [] : result.errors
			};

		} catch (error) {
			return {
				name: 'Sandbox Processing',
				success: false,
				duration: Date.now() - startTime,
				errors: [`Sandbox processing failed: ${error.message}`]
			};
		}
	}

	private async runSecureStorage(buffer: Buffer, fileName: string, authorId: string): Promise<ValidationStep> {
		const startTime = Date.now();

		try {
			const result = await SecureStorage.storeSecurely(buffer, fileName, authorId);

			return {
				name: 'Secure Storage',
				success: true,
				duration: Date.now() - startTime,
				details: {
					fileId: result.secureId,
					downloadToken: result.downloadToken,
					storagePath: result.storagePath
				}
			};

		} catch (error) {
			return {
				name: 'Secure Storage',
				success: false,
				duration: Date.now() - startTime,
				errors: [`Secure storage failed: ${error.message}`]
			};
		}
	}

	private async cleanupTempFile(filePath: string): Promise<void> {
		try {
			await fs.unlink(filePath);
		} catch (error) {
			console.error('Error cleaning temp file:', error);
		}
	}
}