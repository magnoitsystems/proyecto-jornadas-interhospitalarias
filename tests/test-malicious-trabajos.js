// Script para testear validaciones de seguridad en /api/trabajo

import fs from 'fs';
import path from 'path';
import { FormData, File } from 'formdata-node';

// Datos de prueba reutilizables
const baseWorkData = {
    title: 'Trabajo de Prueba Seguridad',
    category: 'Investigación',
    description: 'Documento de prueba para validaciones de seguridad',
    autores: JSON.stringify([
        { nombre: 'Dr. Test', afiliacion: 'Hospital Test' }
    ]),
    premio: 'false'
};

// Configuración de casos de prueba
const testCases = [
    {
        name: 'PDF con EICAR (Virus Test)',
        filename: 'eicar-test.pdf',
        shouldFail: true,
        expectedError: 'Amenaza detectada',
        createFile: () => createEicarPdf()
    },
    {
        name: 'PDF con JavaScript Malicioso',
        filename: 'javascript-malicious.pdf',
        shouldFail: true,
        expectedError: 'JavaScript embebido',
        createFile: () => createJavaScriptPdf()
    },
    {
        name: 'PDF con Formularios Interactivos',
        filename: 'interactive-forms.pdf',
        shouldWarn: true,
        expectedWarning: 'formularios interactivos',
        createFile: () => createInteractiveFormsPdf()
    },
    {
        name: 'PDF con Enlaces Externos Múltiples',
        filename: 'external-links.pdf',
        shouldWarn: true,
        expectedWarning: 'enlaces externos',
        createFile: () => createExternalLinksPdf()
    },
    {
        name: 'PDF Encriptado',
        filename: 'encrypted.pdf',
        shouldWarn: true,
        expectedWarning: 'encriptado',
        createFile: () => createEncryptedPdf()
    },
    {
        name: 'Archivo con Firma PDF Falsa',
        filename: 'fake-signature.pdf',
        shouldFail: true,
        expectedError: 'PDF válido',
        createFile: () => createFakePdfSignature()
    },
    {
        name: 'Archivo Demasiado Grande',
        filename: 'oversized.pdf',
        shouldFail: true,
        expectedError: 'demasiado grande',
        createFile: () => createOversizedPdf()
    },
    {
        name: 'PDF Corrupto/Truncado',
        filename: 'corrupted.pdf',
        shouldFail: true,
        expectedError: 'corrupto',
        createFile: () => createCorruptedPdf()
    },
    {
        name: 'PDF con Attachments Embebidos',
        filename: 'with-attachments.pdf',
        shouldWarn: true,
        expectedWarning: 'archivos adjuntos',
        createFile: () => createPdfWithAttachments()
    },
    {
        name: 'PDF Legítimo (Control)',
        filename: 'legitimate.pdf',
        shouldPass: true,
        createFile: () => createLegitimateValidPdf()
    }
];

// Crear directorio de pruebas
function ensureTestDirectory() {
    const testDir = './test-files';
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
    }
    return testDir;
}

// Funciones para crear PDFs maliciosos de prueba

function createEicarPdf() {
    return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 200 >>
stream
BT
/F1 12 Tf
100 700 Td
(X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000079 00000 n
0000000173 00000 n
0000000301 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
379
%%EOF`;
}

function createJavaScriptPdf() {
    return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R /OpenAction << /Type /Action /S /JavaScript /JS (
var maliciousCode = "alert('Potentially malicious JavaScript execution')";
app.alert("Security test - JavaScript detected");
) >> >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 50 >>
stream
BT
/F1 12 Tf
100 700 Td
(Documento con JavaScript) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000250 00000 n
0000000300 00000 n
0000000400 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
500
%%EOF`;
}

function createInteractiveFormsPdf() {
    return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R /AcroForm << /Fields [4 0 R] >> >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Annots [4 0 R] >>
endobj
4 0 obj
<< /Type /Annot /Subtype /Widget /Rect [100 700 200 720] /FT /Tx /T (TestField) >>
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000100 00000 n
0000000150 00000 n
0000000250 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
350
%%EOF`;
}

function createExternalLinksPdf() {
    return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] 
   /Annots [
     << /Type /Annot /Subtype /Link /Rect [100 700 200 720] 
        /A << /Type /Action /S /URI /URI (http://suspicious-site.example.com) >> >>
     << /Type /Annot /Subtype /Link /Rect [100 650 200 670] 
        /A << /Type /Action /S /URI /URI (https://malicious-domain.example.org) >> >>
     << /Type /Annot /Subtype /Link /Rect [100 600 200 620] 
        /A << /Type /Action /S /URI /URI (https://phishing-test.example.net) >> >>
   ] >>
endobj
xref
0 4
0000000000 65535 f
0000000010 00000 n
0000000079 00000 n
0000000173 00000 n
trailer
<< /Size 4 /Root 1 0 R >>
startxref
600
%%EOF`;
}

function createEncryptedPdf() {
    return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>
endobj
trailer
<< /Size 4 /Root 1 0 R /Encrypt << /Filter /Standard /V 1 /R 2 /O <test> /U <test> /P -4 >> >>
startxref
250
%%EOF`;
}

function createFakePdfSignature() {
    return `FAKE-PDF-1.4
This is not a real PDF file
It just pretends to be one
But lacks the proper %PDF signature
And should be rejected by validation
%%EOF`;
}

function createOversizedPdf() {
    // Crear un PDF que exceda el límite de tamaño (simulado)
    const baseContent = createLegitimateValidPdf();
    const largePadding = 'A'.repeat(12 * 1024 * 1024); // 12MB de padding
    return baseContent + '\n% Large padding:\n' + largePadding;
}

function createCorruptedPdf() {
    return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj corrupted data here
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
missing endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>
endobj
xref corrupted
0 4
invalid xref entries
trailer corrupted
%%EOF incomplete`;
}

function createPdfWithAttachments() {
    return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R /Names << /EmbeddedFiles 4 0 R >> >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>
endobj
4 0 obj
<< /Names [(attachment.txt) 5 0 R] >>
endobj
5 0 obj
<< /Type /Filespec /F (attachment.txt) /EF << /F 6 0 R >> >>
endobj
6 0 obj
<< /Type /EmbeddedFile /Length 20 >>
stream
Hidden attachment data
endstream
endobj
xref
0 7
0000000000 65535 f
0000000010 00000 n
0000000100 00000 n
0000000150 00000 n
0000000200 00000 n
0000000250 00000 n
0000000300 00000 n
trailer
<< /Size 7 /Root 1 0 R >>
startxref
400
%%EOF`;
}

function createLegitimateValidPdf() {
    return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 200 >>
stream
BT
/F1 12 Tf
100 700 Td
(Este es un documento PDF legítimo y seguro) Tj
0 -20 Td
(Contiene solo texto sin elementos peligrosos) Tj
0 -20 Td
(Debería pasar todas las validaciones de seguridad) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000079 00000 n
0000000173 00000 n
0000000301 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
379
%%EOF`;
}

// Función principal de testing
async function runSecurityTests() {
    console.log('Iniciando tests de seguridad para /api/trabajo\n');

    const testDir = ensureTestDirectory();
    const results = {
        total: testCases.length,
        passed: 0,
        failed: 0,
        warnings: 0
    };

    for (const testCase of testCases) {
        console.log(`\n=== Testing: ${testCase.name} ===`);

        try {
            // Crear archivo de prueba
            const fileContent = testCase.createFile();
            const filePath = path.join(testDir, testCase.filename);
            fs.writeFileSync(filePath, fileContent);

            // Preparar FormData
            const formData = new FormData();
            formData.append('title', `${baseWorkData.title} - ${testCase.name}`);
            formData.append('category', baseWorkData.category);
            formData.append('description', baseWorkData.description);
            formData.append('autores', baseWorkData.autores);
            formData.append('premio', baseWorkData.premio);

            // Agregar archivo
            const fileBuffer = fs.readFileSync(filePath);
            const file = new File([fileBuffer], testCase.filename, { type: 'application/pdf' });
            formData.append('file', file);

            // Hacer request a la API
            const response = await fetch('http://localhost:3000/api/trabajo', {
                method: 'POST',
                body: formData,
                headers: {
                    // Nota: No agregar Content-Type, fetch lo maneja automáticamente con FormData
                }
            });

            const responseData = await response.json();

            // Evaluar resultados
            if (testCase.shouldFail) {
                if (!response.ok) {
                    console.log(`✅ Correctamente rechazado: ${response.status}`);
                    console.log(`   Razón: ${responseData.message}`);
                    if (responseData.errors) {
                        console.log(`   Errores: ${responseData.errors.join(', ')}`);
                    }
                    results.passed++;
                } else {
                    console.log(`❌ FALLO: Debería haber sido rechazado pero fue aceptado`);
                    console.log(`   Response: ${JSON.stringify(responseData, null, 2)}`);
                    results.failed++;
                }
            } else if (testCase.shouldWarn) {
                if (response.ok) {
                    console.log(`⚠️  Aceptado con warnings (esperado)`);
                    if (responseData.validationSummary?.warningsCount > 0) {
                        console.log(`   Warnings detectados: ${responseData.validationSummary.warningsCount}`);
                    }
                    results.warnings++;
                } else {
                    console.log(`❓ Resultado inesperado: ${response.status}`);
                    console.log(`   Response: ${JSON.stringify(responseData, null, 2)}`);
                    results.failed++;
                }
            } else if (testCase.shouldPass) {
                if (response.ok) {
                    console.log(`✅ Correctamente aceptado`);
                    results.passed++;
                } else {
                    console.log(`❌ FALLO: Debería haber sido aceptado pero fue rechazado`);
                    console.log(`   Razón: ${responseData.message}`);
                    results.failed++;
                }
            }

            // Limpiar archivo de prueba
            fs.unlinkSync(filePath);

        } catch (error) {
            console.log(`❌ Error durante el test: ${error.message}`);
            results.failed++;
        }
    }

    // Resumen final
    console.log('\n' + '='.repeat(50));
    console.log('RESUMEN DE TESTS DE SEGURIDAD');
    console.log('='.repeat(50));
    console.log(`Total de tests: ${results.total}`);
    console.log(`Exitosos: ${results.passed}`);
    console.log(`Con warnings: ${results.warnings}`);
    console.log(`Fallidos: ${results.failed}`);
    console.log(`Tasa de éxito: ${((results.passed + results.warnings) / results.total * 100).toFixed(1)}%`);

    if (results.failed === 0) {
        console.log('\n🎉 Todas las validaciones de seguridad funcionan correctamente');
    } else {
        console.log('\n⚠️  Algunas validaciones necesitan revisión');
    }
}

// Ejecutar tests
runSecurityTests().catch(error => {
    console.error('Error ejecutando tests:', error);
    process.exit(1);
});