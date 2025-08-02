import { exec } from 'child_process';
import { promisify } from 'util';
import { promises as fs } from 'fs';
import path from 'path';

interface SandboxResult {
	success: boolean;
	metadata: any;
	errors: string[];
}

export class SandboxProcessor {
	private static readonly execAsync = promisify(exec);
	private static readonly SANDBOX_BASE = '/tmp/pdf_sandbox';

	static async processInSandbox(filePath: string): Promise<SandboxResult> {
		console.log('Procesando PDF en sandbox:', filePath);

		const errors: string[] = [];
		let metadata: any = {};
		let sandboxDir = '';

		try {
			sandboxDir = await this.createSandboxDirectory();
			const sandboxFile = await this.copyToSandbox(filePath, sandboxDir);

			console.log('PDF copiado a sandbox:', sandboxFile);

			metadata = await this.extractMetadataSafely(sandboxFile);

			const contentValidation = await this.validateContentStructure(sandboxFile);
			if (!contentValidation.isValid) {
				errors.push(...contentValidation.errors);
			}

			const sizeValidation = await this.validateFileSize(sandboxFile);
			if (!sizeValidation.isValid) {
				errors.push(...sizeValidation.errors);
			}

			console.log('Procesamiento sandbox completado');
			return {
				success: errors.length === 0,
				metadata,
				errors
			};

		} catch (error) {
			console.error('Error en procesamiento sandbox:', error);
			errors.push('Error técnico en sandbox');

			return {
				success: false,
				metadata: {},
				errors
			};
		} finally {
			if (sandboxDir) {
				await this.cleanupSandbox(sandboxDir);
			}
		}
	}

	private static async createSandboxDirectory(): Promise<string> {
		const sandboxDir = path.join(this.SANDBOX_BASE, `sandbox_${Date.now()}_${Math.random().toString(36).substring(7)}`);
		await fs.mkdir(sandboxDir, { recursive: true });
		await this.execAsync(`chmod 755 "${sandboxDir}"`);
		return sandboxDir;
	}

	private static async copyToSandbox(filePath: string, sandboxDir: string): Promise<string> {
		const sandboxFile = path.join(sandboxDir, 'document.pdf');
		await fs.copyFile(filePath, sandboxFile);
		await this.execAsync(`chmod 444 "${sandboxFile}"`);
		return sandboxFile;
	}

	private static async extractMetadataSafely(filePath: string): Promise<any> {
		console.log('Extrayendo metadata de forma segura');

		try {
			const { stdout: mimeOutput } = await this.execAsync(`file -b --mime-type "${filePath}"`);
			const mimeType = mimeOutput.trim();

			const { stdout: sizeOutput } = await this.execAsync(`stat -c%s "${filePath}"`);
			const fileSize = parseInt(sizeOutput.trim());

			const { stdout: permOutput } = await this.execAsync(`stat -c%a "${filePath}"`);
			const permissions = permOutput.trim();

			return {
				mimeType,
				fileSize,
				permissions,
				extractedAt: new Date().toISOString(),
				processingComplete: true
			};

		} catch (error) {
			console.error('Error extrayendo metadata:', error);
			return {
				extractedAt: new Date().toISOString(),
				processingComplete: false,
				error: 'Metadata extraction failed'
			};
		}
	}

	private static async validateContentStructure(filePath: string): Promise<{
		isValid: boolean;
		errors: string[];
	}> {
		console.log('Validando estructura de contenido PDF');

		const errors: string[] = [];

		try {
			const { stdout, stderr } = await this.execAsync(`file "${filePath}"`);

			if (stderr) {
				errors.push('Error al analizar estructura del archivo');
			}

			if (!stdout.includes('PDF document')) {
				errors.push('Archivo no reconocido como PDF válido');
			}

			if (stdout.includes('corrupt') || stdout.includes('damaged')) {
				errors.push('Archivo corrupto o dañado');
			}

			const { stdout: pdfCheck } = await this.execAsync(`pdfinfo "${filePath}" 2>&1 || echo "PDF_CHECK_FAILED"`);

			if (pdfCheck.includes('PDF_CHECK_FAILED') || pdfCheck.includes('Syntax Error')) {
				errors.push('PDF tiene errores de sintaxis o está corrupto');
			}

			return {
				isValid: errors.length === 0,
				errors
			};

		} catch (error) {
			console.error('Error validando estructura:', error);
			return {
				isValid: false,
				errors: ['Error técnico validando estructura']
			};
		}
	}

	private static async validateFileSize(filePath: string): Promise<{
		isValid: boolean;
		errors: string[];
	}> {
		const errors: string[] = [];

		try {
			const stats = await fs.stat(filePath);
			const maxSize = 5 * 1024 * 1024; // 5MB
			const minSize = 100; // 100 Bytes

			if (stats.size > maxSize) {
				errors.push(`Archivo muy grande: ${(stats.size / 1024 / 1024).toFixed(2)}MB (máximo 10MB)`);
			}

			if (stats.size < minSize) {
				errors.push(`Archivo muy pequeño: ${stats.size} bytes (mínimo 100 Bytes)`);
			}

			return {
				isValid: errors.length === 0,
				errors
			};

		} catch {
			return {
				isValid: false,
				errors: ['Error validando tamaño de archivo']
			};
		}
	}

	private static async cleanupSandbox(sandboxDir: string): Promise<void> {
		try {
			await this.execAsync(`rm -rf "${sandboxDir}"`);
			console.log('Sandbox limpiado:', sandboxDir);
		} catch (error) {
			console.error('Error limpiando sandbox:', error);
		}
	}
}