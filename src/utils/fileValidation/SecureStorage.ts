import path from 'path';
import { randomBytes, createHash } from 'crypto';
import { promises as fs } from 'fs';

interface StorageResult {
	storagePath: string;
	secureId: string;
	downloadToken: string;
	metadata: any;
}

interface DownloadTokenPayload {
	fileId: string;
	exp: number;
	nonce: string;
	hash: string;
}

export class SecureStorage {
	private static readonly STORAGE_BASE = process.env.SECURE_PDF_DIR || './secure_pdfs';
	private static readonly TOKEN_SECRET = process.env.STORAGE_TOKEN_SECRET || 'default-secret-change-in-production';

	static async storeSecurely(
		fileBuffer: Buffer,
		originalName: string,
		authorId: string
	): Promise<StorageResult> {
		console.log('Almacenando PDF de forma segura');

		const secureId = this.generateSecureId();
		const dateDir = new Date().toISOString().split('T')[0];
		const authorDir = this.sanitizeAuthorId(authorId);

		const storageDir = path.join(this.STORAGE_BASE, dateDir, authorDir);
		await fs.mkdir(storageDir, { recursive: true });

		const sanitizedName = this.sanitizeFileName(originalName);
		const finalName = `${secureId}_${sanitizedName}`;
		const storagePath = path.join(storageDir, finalName);

		await fs.writeFile(storagePath, fileBuffer, { mode: 0o644 });

		const downloadToken = this.generateSecureDownloadToken(secureId);

		console.log('PDF almacenado en:', storagePath);

		return {
			storagePath,
			secureId,
			downloadToken,
			metadata: {
				originalName: sanitizedName,
				finalName,
				storageDate: new Date().toISOString(),
				authorId,
				fileSize: fileBuffer.length,
				checksum: this.calculateChecksum(fileBuffer)
			}
		};
	}

	static async retrieveSecurely(
		fileId: string,
		token: string
	): Promise<{ success: boolean; filePath?: string; error?: string }> {
		try {
			const tokenValidation = this.validateDownloadToken(token, fileId);
			if (!tokenValidation.isValid) {
				return { success: false, error: tokenValidation.error };
			}

			const filePath = await this.findFileById(fileId);
			if (!filePath) {
				return { success: false, error: 'Archivo no encontrado' };
			}

			const exists = await this.fileExists(filePath);
			if (!exists) {
				return { success: false, error: 'Archivo no existe en el sistema' };
			}

			return { success: true, filePath };

		} catch (error) {
			console.error('Error recuperando archivo:', error);
			return { success: false, error: 'Error técnico en recuperación' };
		}
	}

	private static generateSecureId(): string {
		return randomBytes(32).toString('hex');
	}

	private static sanitizeAuthorId(authorId: string): string {
		return authorId
			.replace(/[^a-zA-Z0-9]/g, '_')
			.substring(0, 8)
			.toLowerCase();
	}

	private static sanitizeFileName(fileName: string): string {
		return fileName
			.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')
			.replace(/^\.+/, '_')
			.replace(/\.+$/, '_')
			.replace(/\s+/g, '_')
			.substring(0, 100);
	}

	private static generateSecureDownloadToken(fileId: string, expirationMinutes: number = 60): string {
		const payload: DownloadTokenPayload = {
			fileId,
			exp: Date.now() + (expirationMinutes * 60 * 1000),
			nonce: randomBytes(16).toString('hex'),
			hash: this.createTokenHash(fileId)
		};

		return Buffer.from(JSON.stringify(payload)).toString('base64url');
	}

	private static validateDownloadToken(token: string, expectedFileId: string): {
		isValid: boolean;
		error?: string;
	} {
		try {
			const payload: DownloadTokenPayload = JSON.parse(
				Buffer.from(token, 'base64url').toString()
			);

			if (Date.now() > payload.exp) {
				return { isValid: false, error: 'Token expirado' };
			}

			if (payload.fileId !== expectedFileId) {
				return { isValid: false, error: 'Token no válido para este archivo' };
			}

			const expectedHash = this.createTokenHash(expectedFileId);
			if (payload.hash !== expectedHash) {
				return { isValid: false, error: 'Token corrupto o inválido' };
			}

			return { isValid: true };

		} catch (error) {
			return { isValid: false, error: 'Token malformado' };
		}
	}

	private static createTokenHash(fileId: string): string {
		return createHash('sha256')
			.update(fileId + this.TOKEN_SECRET)
			.digest('hex');
	}

	private static calculateChecksum(buffer: Buffer): string {
		return createHash('sha256').update(buffer).digest('hex');
	}

	private static async findFileById(fileId: string): Promise<string | null> {
		try {
			const searchPattern = `**/${fileId}_*.pdf`;
			const { glob } = await import('glob');

			const matches = await glob(searchPattern, {
				cwd: this.STORAGE_BASE,
				absolute: true
			});

			return matches.length > 0 ? matches[0] : null;

		} catch (error) {
			console.error('Error buscando archivo:', error);
			return null;
		}
	}

	private static async fileExists(filePath: string): Promise<boolean> {
		try {
			await fs.access(filePath);
			return true;
		} catch {
			return false;
		}
	}

	static async deleteSecurely(fileId: string): Promise<boolean> {
		try {
			const filePath = await this.findFileById(fileId);
			if (!filePath) {
				return false;
			}

			await fs.unlink(filePath);
			console.log('Archivo eliminado de forma segura:', filePath);
			return true;

		} catch (error) {
			console.error('Error eliminando archivo:', error);
			return false;
		}
	}

	static async listStoredFiles(authorId?: string): Promise<any[]> {
		try {
			const pattern = authorId
				? `**/${this.sanitizeAuthorId(authorId)}/*.pdf`
				: '**/*.pdf';

			const { glob } = await import('glob');
			const matches = await glob(pattern, {
				cwd: this.STORAGE_BASE,
				absolute: true
			});

			const files = await Promise.all(
				matches.map(async (filePath) => {
					const stats = await fs.stat(filePath);
					const fileName = path.basename(filePath);
					const fileId = fileName.split('_')[0];

					return {
						fileId,
						fileName,
						filePath,
						size: stats.size,
						created: stats.birthtime,
						modified: stats.mtime
					};
				})
			);

			return files;

		} catch (error) {
			console.error('Error listando archivos:', error);
			return [];
		}
	}
}