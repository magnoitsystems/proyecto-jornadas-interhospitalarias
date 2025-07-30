export interface PdfValidationResult {
	isValid: boolean;
	actualType?: string;
	reason?: string;
}

export interface AntivirusScanResult {
	isClean: boolean;
	result: string;
	threatFound?: string;
}

export interface PdfSecurityResult {
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

export interface SandboxProcessingResult {
	success: boolean;
	metadata: {
		mimeType: string;
		fileSize: number;
		permissions: string;
		extractedAt: string;
		processingComplete: boolean;
		error?: string;
	};
	errors: string[];
}

export interface SecureStorageResult {
	storagePath: string;
	secureId: string;
	downloadToken: string;
	metadata: {
		originalName: string;
		finalName: string;
		storageDate: string;
		authorId: string;
		fileSize: number;
		checksum: string;
	};
}

export interface ValidationSummary {
	typeValidated: boolean;
	virusScanned: boolean;
	securityChecked: boolean;
	sandboxProcessed: boolean;
	securelyStored: boolean;
}

export interface PdfUploadResponse {
	success: boolean;
	message: string;
	fileId: string;
	downloadToken: string;
	metadata: {
		originalName: string;
		finalName: string;
		storageDate: string;
		authorId: string;
		fileSize: number;
		checksum: string;
		securityValidation: ValidationSummary;
		pdfSecurityDetails: PdfSecurityResult['details'];
		sandboxMetadata: SandboxProcessingResult['metadata'];
	};
}

export interface PdfUploadError {
	error: string;
	details?: string;
	criticalIssues?: string[];
	allIssues?: string[];
	maxSize?: string;
	receivedSize?: string;
	message?: string;
}

export interface DownloadTokenPayload {
	fileId: string;
	exp: number;
	nonce: string;
	hash: string;
}

export interface SecureFileInfo {
	fileId: string;
	fileName: string;
	filePath: string;
	size: number;
	created: Date;
	modified: Date;
}

export interface RetrievalResult {
	success: boolean;
	filePath?: string;
	error?: string;
}

export interface TokenValidationResult {
	isValid: boolean;
	error?: string;
}

export const PDF_SECURITY_CONSTANTS = {
	MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
	MIN_FILE_SIZE: 1024, // 1KB
	ALLOWED_MIME_TYPE: 'application/pdf',
	ALLOWED_EXTENSION: 'pdf',
	TOKEN_EXPIRATION_MINUTES: 60,
	SANDBOX_BASE_PATH: '/tmp/pdf_sandbox',
	TEMP_UPLOAD_PATH: '/tmp/pdf_upload_analysis'
} as const;

export const PDF_SECURITY_ERRORS = {
	NO_FILE: 'No file provided',
	NO_AUTHOR: 'Author ID required',
	FILE_TOO_LARGE: 'PDF too large',
	FILE_TOO_SMALL: 'PDF too small',
	INVALID_PDF: 'Invalid PDF file',
	SECURITY_THREAT: 'Security threat detected',
	SECURITY_ISSUES: 'PDF security issues detected',
	SANDBOX_FAILED: 'Sandbox processing failed',
	STORAGE_FAILED: 'Secure storage failed',
	TOKEN_EXPIRED: 'Token expirado',
	TOKEN_INVALID: 'Token no válido para este archivo',
	TOKEN_CORRUPTED: 'Token corrupto o inválido',
	TOKEN_MALFORMED: 'Token malformado',
	FILE_NOT_FOUND: 'Archivo no encontrado',
	FILE_NOT_EXISTS: 'Archivo no existe en el sistema'
} as const;