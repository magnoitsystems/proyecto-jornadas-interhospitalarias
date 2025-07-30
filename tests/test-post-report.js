// testCSVAPI.js

const testCSVGeneration = async () => {
    const baseURL = 'http://localhost:3000';

    // Test 1: Solo profesiones, formato legible
    const test1 = {
        includeGender: false,
        includeSpecialty: false,
        includeProfession: true,
        healthOnly: false,
        format: 'readable',
        userCount: 100
    };

    // Test 2: Solo género y especialidades, solo profesionales de salud
    const test2 = {
        includeGender: true,
        includeSpecialty: true,
        includeProfession: false,
        healthOnly: true,
        format: 'readable',
        userCount: 150
    };

    // Test 3: Todo incluido, formato compacto
    const test3 = {
        includeGender: true,
        includeSpecialty: true,
        includeProfession: true,
        healthOnly: false,
        format: 'compact',
        userCount: 200
    };

    const tests = [
        { name: 'Test 1 - Solo Profesiones', data: test1 },
        { name: 'Test 2 - Género y Especialidades (Solo Salud)', data: test2 },
        { name: 'Test 3 - Completo Formato Compacto', data: test3 }
    ];

    for (const test of tests) {
        try {
            console.log(`\n=== ${test.name} ===`);

            const response = await fetch(`${baseURL}/api/estadistica`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(test.data)
            });

            if (response.ok) {
                const filename = response.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'download.csv';
                const csvContent = await response.text();

                console.log(`Archivo: ${filename}`);
                console.log('Contenido preview:');
                console.log(csvContent.substring(0, 500) + '...');

            } else {
                const error = await response.json();
                console.error('Error:', error);
            }

        } catch (error) {
            console.error(`Error en ${test.name}:`, error);
        }
    }
};

// Test de validaciones
const testValidations = async () => {
    const baseURL = 'http://localhost:3000';

    console.log('\n=== TESTS DE VALIDACIÓN ===');

    // Test userCount inválido
    const invalidUserCount = {
        includeGender: true,
        userCount: 1500 // Excede el máximo
    };

    try {
        const response = await fetch(`${baseURL}/api/estadistica`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invalidUserCount)
        });

        const result = await response.json();
        console.log('Test userCount inválido:', result);

    } catch (error) {
        console.error('Error en test de validación:', error);
    }
};

// Ejecutar tests
const runAllTests = async () => {
    console.log('Iniciando tests de API CSV...');
    await testCSVGeneration();
    await testValidations();
    console.log('\nTests completados.');
};

// Ejecutar si se corre directamente
if (typeof window === 'undefined') {
    runAllTests();
}

// Para usar en navegador
if (typeof window !== 'undefined') {
    window.testCSV = runAllTests;
    console.log('Tests disponibles. Ejecuta: testCSV()');
}