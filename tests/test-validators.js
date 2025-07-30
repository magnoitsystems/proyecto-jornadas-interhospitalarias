import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function testIndividualValidators() {
    console.log('🧪 === TESTING VALIDADORES INDIVIDUALES ===\n');

    const testPdf = 'test-files/sample.pdf';

    // 1. Test FileTypeValidator logic
    console.log('🔍 Testing File Type Validation...');
    const buffer = fs.readFileSync(testPdf);
    const signature = Array.from(buffer.slice(0, 4));
    const pdfSignature = [0x25, 0x50, 0x44, 0x46]; // %PDF

    const isValidPdf = signature.every((byte, i) => byte === pdfSignature[i]);
    console.log(`${isValidPdf ? '✅' : '❌'} PDF signature validation: ${isValidPdf}`);

    const hasValidExtension = testPdf.toLowerCase().endsWith('.pdf');
    console.log(`${hasValidExtension ? '✅' : '❌'} PDF extension validation: ${hasValidExtension}`);

    // 2. Test AntivirusScanner
    console.log('\n🦠 Testing Antivirus Scanner...');
    try {
        const { stdout } = await execAsync(`clamscan "${testPdf}"`);
        const isClean = stdout.includes('OK') && !stdout.includes('FOUND');
        console.log(`${isClean ? '✅' : '❌'} Antivirus scan: ${isClean ? 'CLEAN' : 'THREAT DETECTED'}`);

        // Test scan summary
        const lines = stdout.split('\n');
        const summaryLine = lines.find(line => line.includes('Infected files:'));
        if (summaryLine) {
            console.log(`   ${summaryLine.trim()}`);
        }
    } catch (error) {
        console.log('❌ Antivirus scan failed:', error.message.slice(0, 50));
    }

    // 3. Test PdfValidator
    console.log('\n📄 Testing PDF Security Validator...');
    try {
        // Check for JavaScript
        const { stdout: jsCheck } = await execAsync(`strings "${testPdf}" | grep -i "javascript\\|/js" || echo "NO_JS"`);
        const hasJavaScript = jsCheck.trim() !== 'NO_JS' && jsCheck.trim().length > 0;
        console.log(`${!hasJavaScript ? '✅' : '⚠️'} JavaScript check: ${hasJavaScript ? 'FOUND (risky)' : 'NONE (safe)'}`);

        // Check for interactive forms
        const { stdout: formsCheck } = await execAsync(`strings "${testPdf}" | grep -i "acroform\\|widget" || echo "NO_FORMS"`);
        const hasForms = formsCheck.trim() !== 'NO_FORMS' && formsCheck.trim().length > 0;
        console.log(`${!hasForms ? '✅' : '⚠️'} Interactive forms: ${hasForms ? 'FOUND (risky)' : 'NONE (safe)'}`);

        // Check for external links
        const { stdout: linksCheck } = await execAsync(`strings "${testPdf}" | grep -oE 'https?://[^\\s"<>]+' || echo "NO_LINKS"`);
        const hasLinks = linksCheck.trim() !== 'NO_LINKS' && linksCheck.trim().length > 0;
        console.log(`${!hasLinks ? '✅' : '⚠️'} External links: ${hasLinks ? 'FOUND' : 'NONE'}`);

        // Check encryption
        const { stdout: pdfInfo } = await execAsync(`pdfinfo "${testPdf}"`);
        const isEncrypted = pdfInfo.includes('Encrypted:') && !pdfInfo.includes('Encrypted: no');
        console.log(`${!isEncrypted ? '✅' : '⚠️'} Encryption: ${isEncrypted ? 'ENCRYPTED (risky)' : 'NOT ENCRYPTED (ok)'}`);

    } catch (error) {
        console.log('❌ PDF security validation failed:', error.message.slice(0, 50));
    }

    // 4. Test SandboxProcessor logic
    console.log('\n🏠 Testing Sandbox Processing...');
    try {
        const stats = fs.statSync(testPdf);
        const maxSize = 10 * 1024 * 1024; // 10MB
        const minSize = 1024; // 1KB

        const sizeOk = stats.size >= minSize && stats.size <= maxSize;
        console.log(`${sizeOk ? '✅' : '❌'} File size validation: ${(stats.size / 1024).toFixed(2)}KB (${sizeOk ? 'valid' : 'invalid'})`);

        // File type check
        const { stdout } = await execAsync(`file "${testPdf}"`);
        const isPdfFile = stdout.includes('PDF document');
        console.log(`${isPdfFile ? '✅' : '❌'} File type validation: ${isPdfFile ? 'PDF confirmed' : 'NOT PDF'}`);

    } catch (error) {
        console.log('❌ Sandbox processing failed:', error.message.slice(0, 50));
    }

    console.log('\n🎯 === TESTING INDIVIDUAL COMPLETADO ===');
    console.log('Si todo está ✅ o ⚠️ (warnings aceptables), el sistema funciona correctamente');
    console.log('\nNext step: Testear APIs con pnpm dev');
}

testIndividualValidators().catch(console.error);