/**
 * Tests para el Generador de Contraseñas
 * Archivo de pruebas para validar que funciona correctamente
 */

import { PasswordGenerator } from '@/utils/PasswordGenerator';

// Función helper para validar caracteres
function validatePassword(password: string): {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    onlyValidChars: boolean;
    correctLength: boolean;
    actualLength: number;
} {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const onlyValidChars = /^[A-Za-z0-9]+$/.test(password);

    return {
        hasUppercase,
        hasLowercase,
        hasNumbers,
        onlyValidChars,
        correctLength: password.length >= 6 && password.length <= 50,
        actualLength: password.length
    };
}

// Función para mostrar resultados de test
function runTest(testName: string, testFunction: () => boolean): void {
    try {
        const result = testFunction();
        console.log(`[PASS] ${testName}: ${result ? 'PASSED' : 'FAILED'}`);
    } catch (error: any) {
        console.log(`[ERROR] ${testName}: ERROR - ${error.message}`);
    }
}

// Tests principales
function runAllTests(): void {
    console.log('INICIANDO TESTS DEL GENERADOR DE CONTRASEÑAS\n');

    const generator = new PasswordGenerator();

    // Test 1: Longitud por defecto
    runTest('Longitud por defecto (12 caracteres)', () => {
        const password = generator.generatePassword();
        return password.length === 12;
    });

    // Test 2: Longitud personalizada
    runTest('Longitud personalizada (16 caracteres)', () => {
        const password = generator.generatePassword(16);
        return password.length === 16;
    });

    // Test 3: Contiene todos los tipos de caracteres
    runTest('Contiene mayusculas, minusculas y numeros', () => {
        const password = generator.generatePassword(12);
        const validation = validatePassword(password);
        return validation.hasUppercase && validation.hasLowercase && validation.hasNumbers;
    });

    // Test 4: Solo caracteres válidos
    runTest('Solo contiene caracteres validos (A-Z, a-z, 0-9)', () => {
        const password = generator.generatePassword(12);
        const validation = validatePassword(password);
        return validation.onlyValidChars;
    });

    // Test 5: Longitud mínima
    runTest('Longitud minima (6 caracteres)', () => {
        const password = generator.generatePassword(6);
        const validation = validatePassword(password);
        return validation.actualLength === 6 && validation.correctLength;
    });

    // Test 6: Longitud máxima
    runTest('Longitud maxima (50 caracteres)', () => {
        const password = generator.generatePassword(50);
        const validation = validatePassword(password);
        return validation.actualLength === 50 && validation.correctLength;
    });

    // Test 7: Error en longitud muy corta
    runTest('Error con longitud menor a 6', () => {
        try {
            generator.generatePassword(3);
            return false; // No debería llegar aquí
        } catch (error: any) {
            return error.message.includes('Length must be between 6 and 50');
        }
    });

    // Test 8: Error en longitud muy larga
    runTest('Error con longitud mayor a 50', () => {
        try {
            generator.generatePassword(100);
            return false; // No debería llegar aquí
        } catch (error: any) {
            return error.message.includes('Length must be between 6 and 50');
        }
    });

    // Test 9: Passwords únicas (probabilísticamente)
    runTest('Genera passwords diferentes en multiples llamadas', () => {
        const passwords = new Set<string>();
        for (let i = 0; i < 10; i++) {
            passwords.add(generator.generatePassword(12));
        }
        return passwords.size === 10; // Todas deberían ser diferentes
    });

    // Test 10: Contiene números específicos (0 y 1)
    runTest('Puede generar numeros 0 y 1', () => {
        let found0 = false;
        let found1 = false;

        // Generar múltiples passwords para encontrar 0 y 1
        for (let i = 0; i < 50; i++) {
            const password = generator.generatePassword(20);
            if (password.includes('0')) found0 = true;
            if (password.includes('1')) found1 = true;
            if (found0 && found1) break;
        }

        return found0 && found1;
    });

    console.log('\nTESTS DE ANALISIS DETALLADO\n');

    // Análisis detallado de una password
    const samplePassword = generator.generatePassword(16);
    const analysis = validatePassword(samplePassword);

    console.log(`Analisis de password muestra: "${samplePassword}"`);
    console.log(`   Longitud: ${analysis.actualLength}`);
    console.log(`   Tiene mayusculas: ${analysis.hasUppercase ? 'SI' : 'NO'}`);
    console.log(`   Tiene minusculas: ${analysis.hasLowercase ? 'SI' : 'NO'}`);
    console.log(`   Tiene numeros: ${analysis.hasNumbers ? 'SI' : 'NO'}`);
    console.log(`   Solo caracteres validos: ${analysis.onlyValidChars ? 'SI' : 'NO'}`);

    // Test de distribución de caracteres
    console.log('\nANALISIS DE DISTRIBUCION\n');

    const charCounts = { uppercase: 0, lowercase: 0, numbers: 0 };
    const testPassword = generator.generatePassword(30);

    for (const char of testPassword) {
        if (/[A-Z]/.test(char)) charCounts.uppercase++;
        else if (/[a-z]/.test(char)) charCounts.lowercase++;
        else if (/[0-9]/.test(char)) charCounts.numbers++;
    }

    console.log(`Password de 30 caracteres: "${testPassword}"`);
    console.log(`Mayusculas: ${charCounts.uppercase} (${((charCounts.uppercase/30)*100).toFixed(1)}%)`);
    console.log(`Minusculas: ${charCounts.lowercase} (${((charCounts.lowercase/30)*100).toFixed(1)}%)`);
    console.log(`Numeros: ${charCounts.numbers} (${((charCounts.numbers/30)*100).toFixed(1)}%)`);

    // Generar ejemplos de diferentes longitudes
    console.log('\nEJEMPLOS DE PASSWORDS GENERADAS\n');

    const lengths = [6, 8, 12, 16, 20];
    lengths.forEach(length => {
        const example = generator.generatePassword(length);
        console.log(`Longitud ${length.toString().padStart(2)}: ${example}`);
    });

    console.log('\nTESTS COMPLETADOS');
}

// Ejecutar todos los tests
runAllTests();