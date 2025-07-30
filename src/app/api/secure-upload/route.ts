import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { randomBytes, createHash } from 'crypto';

interface UploadRequest {
	file: {
		name: string;
		content: string; // contenido codificado en base64
		type?: string;
	};
	authorId: string;
}

export async function POST(request: NextRequest) {
	console.log('=== INICIO SECURE PDF UPLOAD API (JSON) ===');

	try {
		// Información de depuración
		console.log('--- INFO DE DEPURACIÓN ---');
		console.log('Método:', request.method);
		console.log('URL:', request.url);

		const contentType = request.headers.get('content-type');
		console.log('Content-Type:', contentType);

		// Parsear cuerpo JSON
		let body: UploadRequest;
		try {
			body = await request.json();
			console.log('JSON parseado correctamente');
		} catch (jsonError) {
			console.log('Error al parsear JSON:', jsonError);
			return NextResponse.json({
				error: 'Cuerpo JSON inválido',
				details: 'El cuerpo de la petición debe ser JSON válido'
			}, { status: 400 });
		}

		console.log('--- CONTENIDO PARSEADO ---');
		console.log('Estructura de la petición:', {
			hisFile: !!body.file,
			fileName: body.file?.name,
			fileContentLength: body.file?.content?.length,
			authorId: body.authorId
		});

		// Validaciones básicas
		if (!body.file) {
			return NextResponse.json({
				error: 'No se proporcionó archivo',
				expected: 'JSON con file.name y file.content (base64)'
			}, { status: 400 });
		}

		if (!body.file.name) {
			return NextResponse.json({
				error: 'Nombre de archivo requerido',
				received: body.file
			}, { status: 400 });
		}

		if (!body.file.content) {
			return NextResponse.json({
				error: 'Contenido de archivo requerido',
				expected: 'contenido codificado en base64'
			}, { status: 400 });
		}

		if (!body.authorId) {
			return NextResponse.json({
				error: 'Se requiere ID de autor'
			}, { status: 400 });
		}

		// Verificar extensión PDF
		if (!body.file.name.toLowerCase().endsWith('.pdf')) {
			return NextResponse.json({
				error: 'No es un archivo PDF',
				receivedName: body.file.name,
				expectedExtension: '.pdf'
			}, { status: 400 });
		}

		// Decodificar base64
		let buffer: Buffer;
		try {
			// Eliminar prefijo data:url si existe
			let base64Content = body.file.content;
			if (base64Content.includes(',')) {
				base64Content = base64Content.split(',')[1];
			}

			buffer = Buffer.from(base64Content, 'base64');
			console.log('Base64 decodificado, tamaño:', buffer.length);
		} catch (base64Error) {
			console.log('Error al decodificar base64:', base64Error);
			return NextResponse.json({
				error: 'Contenido base64 inválido',
				details: 'El contenido debe ser base64 válido'
			}, { status: 400 });
		}

		// Verificar tamaño máximo (5MB)
		const maxSize = 5 * 1024 * 1024; // 5MB
		if (buffer.length > maxSize) {
			return NextResponse.json({
				error: 'Archivo demasiado grande',
				maxSize: '5MB',
				receivedSize: `${(buffer.length / 1024 / 1024).toFixed(2)}MB`
			}, { status: 400 });
		}

		if (buffer.length === 0) {
			return NextResponse.json({
				error: 'Archivo vacío',
				debug: 'El archivo decodificado tiene 0 bytes'
			}, { status: 400 });
		}

		// Verificar cabecera PDF
		const signature = Array.from(buffer.slice(0, 4));
		const pdfSignature = [0x25, 0x50, 0x44, 0x46]; // %PDF
		const isValidPdf = signature.every((byte, i) => byte === pdfSignature[i]);

		console.log('Verificación de firma PDF:', {
			received: signature.map(b => '0x' + b.toString(16).padStart(2, '0')),
			expected: pdfSignature.map(b => '0x' + b.toString(16).padStart(2, '0')),
			isValid: isValidPdf
		});

		if (!isValidPdf) {
			return NextResponse.json({
				error: 'Firma PDF inválida',
				debug: 'El archivo no comienza con el encabezado %PDF',
				receivedSignature: signature.map(b => '0x' + b.toString(16).padStart(2, '0'))
			}, { status: 400 });
		}

		// Crear directorio temporal
		const tempDir = '/tmp/pdf_upload_analysis';
		await fs.mkdir(tempDir, { recursive: true });
		const tempPath = path.join(tempDir, `temp_${Date.now()}_${body.file.name}`);

		// Guardar archivo temporalmente
		await fs.writeFile(tempPath, buffer);
		console.log('PDF guardado temporalmente en:', tempPath);

		// Verificar que el archivo se guardó correctamente
		const stats = await fs.stat(tempPath);
		console.log('Archivo verificado:', {
			size: stats.size,
			created: stats.birthtime
		});

		// Generar respuesta de éxito
		const fileId = randomBytes(32).toString('hex');
		const result = {
			success: true,
			message: 'PDF subido y validado correctamente',
			fileId: fileId,
			metadata: {
				originalName: body.file.name,
				fileSize: buffer.length,
				uploadTime: new Date().toISOString(),
				authorId: body.authorId,
				pdfSignatureValid: isValidPdf,
				checksum: createHash('sha256').update(buffer).digest('hex')
			},
			debug: {
				tempPath: tempPath,
				base64Length: body.file.content.length,
				decodedSize: buffer.length
			}
		};

		// Eliminar archivo temporal
		await fs.unlink(tempPath);
		console.log('Archivo temporal eliminado');

		console.log('=== ÉXITO ===');
		return NextResponse.json(result);

	} catch (error) {
		console.error('=== ERROR GENERAL ===');
		console.error('Error:', error);

		return NextResponse.json({
			error: 'Error interno durante la subida de PDF',
			debug: {
				errorType: typeof error,
				errorMessage: error instanceof Error ? error.message : 'Error desconocido'
			}
		}, { status: 500 });
	}
}
