import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);

async function testPdfValidation() {
    console.log('🧪 === TEST SISTEMA PDF ===\n');
    
    // 1. Verificar archivos
    const files = [
        'src/utils/fileValidation/antiVirusScanner.ts',
        'src/utils/fileValidation/fileTypeValidation.ts',
        'src/utils/fileValidation/PdfValidator.ts',
        'src/utils/fileValidation/SandBoxProcessor.ts',
        'src/utils/fileValidation/SecureStorage.ts'
    ];
    
    console.log('📁 Archivos de validación:');
    let allFilesExist = true;
    files.forEach(file => {
        const exists = fs.existsSync(file);
        console.log(`${exists ? '✅' : '❌'} ${file}`);
        if (!exists) allFilesExist = false;
    });
    
    if (!allFilesExist) {
        console.log('\n❌ Faltan archivos. Verifica la estructura del proyecto.');
        return;
    }
    
    // 2. Verificar herramientas
    console.log('\n🔧 Herramientas del sistema:');
    try {
        const { stdout } = await execAsync('clamscan --version');
        console.log('✅ ClamAV:', stdout.split('\n')[0]);
    } catch {
        console.log('❌ ClamAV no disponible');
        return;
    }
    
    try {
        await execAsync('pdfinfo -v');
        console.log('✅ PDFInfo disponible');
    } catch {
        console.log('❌ PDFInfo no disponible');
        return;
    }
    
    // 3. Crear PDF de prueba
    const testPdf = 'test-files/sample.pdf';
    if (!fs.existsSync(testPdf)) {
        console.log('\n📄 Creando PDF de prueba...');
        try {
            await execAsync(`echo "Test PDF para validaciones\nJornadas Médicas\n$(date)" | ps2pdf - "${testPdf}"`);
            console.log('✅ PDF de prueba creado');
        } catch {
            // Crear PDF simple alternativo
            const pdfContent = Buffer.from('%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n>>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000010 00000 n \n0000000079 00000 n \n0000000173 00000 n \ntrailer\n<<\n/Size 4\n/Root 1 0 R\n>>\nstartxref\n301\n%%EOF');
            fs.writeFileSync(testPdf, pdfContent);
            console.log('✅ PDF básico creado');
        }
    } else {
        console.log('\n📄 Usando PDF existente');
    }
    
    // 4. Test ClamAV scan
    console.log('\n🦠 Testing ClamAV scan...');
    try {
        const { stdout } = await execAsync(`clamscan "${testPdf}"`);
        const isClean = stdout.includes('OK');
        console.log(`${isClean ? '✅' : '⚠️'} Resultado: ${isClean ? 'LIMPIO' : 'REVISAR'}`);
    } catch (error) {
        console.log('❌ Error en scan:', error.message.slice(0, 100));
    }
    
    // 5. Test PDF info
    console.log('\n📋 Testing PDF metadata...');
    try {
        const { stdout } = await execAsync(`pdfinfo "${testPdf}"`);
        console.log('✅ Metadata obtenida');
        const lines = stdout.split('\n').slice(0, 3);
        lines.forEach(line => line.trim() && console.log(`   ${line}`));
    } catch (error) {
        console.log('❌ Error metadata:', error.message.slice(0, 100));
    }
    
    // 6. Test file signature
    console.log('\n🔍 Testing file signature...');
    try {
        const buffer = fs.readFileSync(testPdf);
        const signature = Array.from(buffer.slice(0, 4)).map(b => '0x' + b.toString(16).padStart(2, '0'));
        const isPdf = signature.join(' ') === '0x25 0x50 0x44 0x46';
        console.log(`${isPdf ? '✅' : '❌'} PDF signature: ${signature.join(' ')}`);
        console.log(`   Expected: 0x25 0x50 0x44 0x46 (%PDF)`);
    } catch (error) {
        console.log('❌ Error signature:', error.message);
    }
    
    // 7. Test Next.js compilation
    console.log('\n⚡ Testing Next.js build...');
    try {
        await execAsync('pnpm build');
        console.log('✅ Next.js build successful');
    } catch (error) {
        console.log('❌ Build error:', error.message.slice(0, 200));
    }
    
    console.log('\n🎯 === RESUMEN ===');
    console.log('Si todo está ✅, tu sistema está listo');
    console.log('Para test completo: pnpm dev y prueba la API');
    console.log('Archivo de prueba:', testPdf);
}

testPdfValidation().catch(console.error);
