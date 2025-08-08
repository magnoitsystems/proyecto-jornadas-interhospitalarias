// tests/test-pdf.js - VERSIÓN CORREGIDA PARA ES MODULES
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testCases = [
    {
        filename: "test_javascript.pdf",
        pattern: "/JavaScript",
        shouldBlock: true,
        description: "PDF con referencia a JavaScript"
    },
    {
        filename: "test_js_short.pdf",
        pattern: "/JS",
        shouldBlock: true,
        description: "PDF con referencia JS abreviada"
    },
    {
        filename: "test_app_alert.pdf",
        pattern: "app.alert",
        shouldBlock: true,
        description: "PDF con comando app.alert"
    },
    {
        filename: "test_submit_form.pdf",
        pattern: "this.submitForm",
        shouldBlock: true,
        description: "PDF con submitForm"
    },
    {
        filename: "test_launch_url.pdf",
        pattern: "this.launchURL",
        shouldBlock: true,
        description: "PDF con launchURL"
    },
    {
        filename: "test_mail_doc.pdf",
        pattern: "this.mailDoc",
        shouldBlock: true,
        description: "PDF con mailDoc"
    },
    {
        filename: "test_eval.pdf",
        pattern: "eval(",
        shouldBlock: true,
        description: "PDF con eval()"
    },
    {
        filename: "test_uri_links.pdf",
        pattern: "/URI(",
        shouldBlock: false,
        description: "PDF con enlaces automáticos (WARNING)"
    },
    {
        filename: "test_http_links.pdf",
        pattern: "http://example.com",
        shouldBlock: false,
        description: "PDF con enlaces HTTP (WARNING)"
    },
    {
        filename: "test_exe_embed.pdf",
        pattern: "malware.exe",
        shouldBlock: false,
        description: "PDF con referencia a ejecutable (WARNING)"
    },
    {
        filename: "test_clean.pdf",
        pattern: "",
        shouldBlock: false,
        description: "PDF limpio sin patrones maliciosos"
    }
];

function createMinimalPdf(maliciousContent = "") {
    const contentLength = 44 + maliciousContent.length;
    const extraContent = maliciousContent ? `0 -20 Td (Pattern: ${maliciousContent}) Tj` : '';

    return `%PDF-1.4
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
/Length ${contentLength}
>>
stream
BT
/F1 12 Tf
100 700 Td
(Test PDF Document - McLovin Edition) Tj
${extraContent}
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
${290 + maliciousContent.length}
%%EOF`;
}

function generateTestPdfs() {
    // Crear directorio relativo al proyecto (no al script)
    const projectRoot = path.dirname(__dirname); // Subir un nivel desde tests/
    const testDir = path.join(projectRoot, 'test_pdfs');

    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
    }

    console.log('GENERANDO PDFs DE PRUEBA...');
    console.log(`Directorio: ${testDir}\n`);

    // Generar PDFs normales
    testCases.forEach(testCase => {
        const pdfContent = createMinimalPdf(testCase.pattern);
        const filePath = path.join(testDir, testCase.filename);

        fs.writeFileSync(filePath, pdfContent, 'binary');

        const status = testCase.shouldBlock ? 'BLOCK' : 'ACCEPT';
        const warning = testCase.shouldBlock ? '' : '(con warnings)';

        console.log(`${status} ${testCase.filename}: ${testCase.description} ${warning}`);
    });

    // Generar casos especiales de tamaño
    console.log('\n GENERANDO CASOS ESPECIALES DE TAMAÑO...');

    // PDF demasiado grande (>5MB)
    console.log('Generando archivo grande (esto puede tomar unos segundos)...');
    const hugePdfContent = createMinimalPdf("A".repeat(6 * 1024 * 1024)); // 6MB
    fs.writeFileSync(path.join(testDir, 'test_too_large.pdf'), hugePdfContent, 'binary');
    console.log('BLOCK test_too_large.pdf: Archivo >5MB');

    // PDF demasiado pequeño (<200 bytes)
    fs.writeFileSync(path.join(testDir, 'test_too_small.pdf'), '%PDF', 'binary');
    console.log('BLOCK test_too_small.pdf: Archivo <200 bytes');

    // Archivo fake (no es PDF)
    fs.writeFileSync(path.join(testDir, 'test_fake.pdf'), 'Este no es un PDF real, es solo texto', 'binary');
    console.log('BLOCK test_fake.pdf: Magic numbers incorrectos');

    // Archivo con extensión incorrecta pero contenido PDF
    const pdfContentWrongExt = createMinimalPdf("Contenido PDF válido");
    fs.writeFileSync(path.join(testDir, 'test_wrong_extension.txt'), pdfContentWrongExt, 'binary');
    console.log('BLOCK test_wrong_extension.txt: Extensión incorrecta');

    console.log(`
TESTING PLAN COMPLETO:
════════════════════════

ARCHIVOS GENERADOS EN: ${testDir}

DEBERÍAN SER BLOQUEADOS (accept: false):
✗ test_javascript.pdf        → Contiene /JavaScript
✗ test_js_short.pdf          → Contiene /JS  
✗ test_app_alert.pdf         → Contiene app.alert
✗ test_submit_form.pdf       → Contiene this.submitForm
✗ test_launch_url.pdf        → Contiene this.launchURL
✗ test_mail_doc.pdf          → Contiene this.mailDoc
✗ test_eval.pdf              → Contiene eval(
✗ test_too_large.pdf         → >5MB
✗ test_too_small.pdf         → <200 bytes
✗ test_fake.pdf              → Magic numbers incorrectos
✗ test_wrong_extension.txt   → Extensión incorrecta

DEBERÍAN SER ACEPTADOS CON WARNINGS:
~ test_uri_links.pdf         → Contiene /URI(
~ test_http_links.pdf        → Contiene http://
~ test_exe_embed.pdf         → Contiene .exe

DEBERÍAN SER ACEPTADOS LIMPIOS:
✓ test_clean.pdf             → Sin patrones maliciosos

PRÓXIMOS PASOS:
1. Ve a tu formulario de upload: http://localhost:3000
2. Prueba cada archivo generado
3. Verifica que los resultados coincidan con las expectativas
4. Revisa los mensajes específicos de error/warning

  `);

    return testDir;
}

// Ejecutar la función principal
try {
    const testDir = generateTestPdfs();
    console.log(`\n¡Todos los PDFs de prueba generados exitosamente!`);
    console.log(` Ubicación: ${testDir}`);
} catch (error) {
    console.error('Error generando PDFs de prueba:', error.message);
    process.exit(1);
}