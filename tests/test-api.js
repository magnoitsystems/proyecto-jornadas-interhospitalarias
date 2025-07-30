const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

class ConsoleVisualizer {
    static header(text) {
        const border = '═'.repeat(text.length + 4);
        console.log(`${colors.cyan}${colors.bright}`);
        console.log(`╔${border}╗`);
        console.log(`║  ${text}  ║`);
        console.log(`╚${border}╝`);
        console.log(`${colors.reset}\n`);
    }

    static section(title) {
        console.log(`${colors.yellow}${colors.bright}${title}${colors.reset}`);
        console.log(`${'─'.repeat(title.length)}\n`);
    }

    static success(message) {
        console.log(`${colors.green}ÉXITO: ${message}${colors.reset}`);
    }

    static error(message) {
        console.log(`${colors.red}ERROR: ${message}${colors.reset}`);
    }

    static info(message) {
        console.log(`${colors.blue}INFO: ${message}${colors.reset}`);
    }

    static warning(message) {
        console.log(`${colors.yellow}ADVERTENCIA: ${message}${colors.reset}`);
    }

    static data(label, value, indent = 0) {
        const spaces = '  '.repeat(indent);
        console.log(`${spaces}${colors.cyan}${label}:${colors.reset} ${colors.white}${value}${colors.reset}`);
    }

    static json(obj, title = 'Datos JSON') {
        console.log(`${colors.magenta}${title}:${colors.reset}`);
        console.log(JSON.stringify(obj, null, 2)
            .split('\n')
            .map(line => `  ${line}`)
            .join('\n'));
        console.log('');
    }

    static table(data, title = 'Tabla de Datos') {
        if (!Array.isArray(data) || data.length === 0) {
            this.warning(`${title}: Sin datos para mostrar`);
            return;
        }

        console.log(`${colors.magenta}${colors.bright}${title}${colors.reset}\n`);

        const keys = Object.keys(data[0]);
        const maxLengths = keys.map(key =>
            Math.max(
                key.length,
                ...data.map(item => String(item[key] || '').length)
            )
        );

        const headerRow = keys.map((key, i) =>
            key.padEnd(maxLengths[i])
        ).join(' | ');

        const separator = maxLengths.map(len => '─'.repeat(len)).join('─┼─');

        console.log(`${colors.cyan}${headerRow}${colors.reset}`);
        console.log(`${colors.cyan}${separator}${colors.reset}`);

        data.forEach(item => {
            const row = keys.map((key, i) =>
                String(item[key] || '').padEnd(maxLengths[i])
            ).join(' | ');
            console.log(row);
        });
        console.log('');
    }
}

class StatsAPITester {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async testGetBasicStats() {
        ConsoleVisualizer.section('PRUEBA: GET Estadísticas Básicas');

        try {
            const response = await fetch(`${this.baseUrl}/api/estadistica`);

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorData}`);
            }

            const data = await response.json();

            ConsoleVisualizer.success(`Status: ${response.status}`);
            ConsoleVisualizer.data('Total estadísticas', data.length);

            if (Array.isArray(data) && data.length > 0) {
                ConsoleVisualizer.table(data, 'Estadísticas de la Base de Datos');
            }

            this.recordTest('GET Estadísticas Básicas', true);
            return { success: true, data };

        } catch (error) {
            ConsoleVisualizer.error(`${error.message}`);
            this.recordTest('GET Estadísticas Básicas', false, error.message);
            return { success: false, error: error.message };
        }
    }

    async testPostCSVGeneration(reportType = 'complete', userCount = 150) {
        ConsoleVisualizer.section(`PRUEBA: POST Generación CSV (${reportType.toUpperCase()})`);

        try {
            const requestBody = { reportType, userCount };

            const response = await fetch(`${this.baseUrl}/api/estadistica`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP ${response.status}: ${errorData.message || 'Error desconocido'}`);
            }

            const contentType = response.headers.get('content-type');
            const contentDisposition = response.headers.get('content-disposition');

            ConsoleVisualizer.success(`Status: ${response.status}`);
            ConsoleVisualizer.data('Content-Type', contentType || 'No especificado');
            ConsoleVisualizer.data('Content-Disposition', contentDisposition || 'No especificado');

            if (contentType && contentType.includes('csv')) {
                const csvContent = await response.text();
                const lines = csvContent.split('\n').filter(line => line.trim());

                ConsoleVisualizer.info('Vista previa del CSV (primeras 10 líneas):');
                console.log(`${colors.yellow}`);
                lines.slice(0, 10).forEach((line, index) => {
                    console.log(`${(index + 1).toString().padStart(2, '0')}: ${line}`);
                });
                console.log(`${colors.reset}\n`);

                ConsoleVisualizer.data('Total de líneas', lines.length);
                ConsoleVisualizer.data('Tamaño del archivo', `${(csvContent.length / 1024).toFixed(2)} KB`);

                this.recordTest(`POST CSV ${reportType}`, true);
                return { success: true, contentType, size: csvContent.length, content: csvContent };
            } else {
                const jsonData = await response.json();
                ConsoleVisualizer.json(jsonData, 'Datos de Respuesta');
                this.recordTest(`POST CSV ${reportType}`, true);
                return { success: true, data: jsonData };
            }

        } catch (error) {
            ConsoleVisualizer.error(`${error.message}`);
            this.recordTest(`POST CSV ${reportType}`, false, error.message);
            return { success: false, error: error.message };
        }
    }

    async testAllCSVTypes() {
        ConsoleVisualizer.header('PRUEBAS DE TODOS LOS TIPOS DE CSV');

        const reportTypes = ['complete', 'profession', 'gender', 'specialty'];
        const results = {};

        for (const type of reportTypes) {
            results[type] = await this.testPostCSVGeneration(type, 100);
            console.log('');
        }

        return results;
    }

    async testPerformance(iterations = 5) {
        ConsoleVisualizer.section('PRUEBA: Rendimiento del Endpoint');

        const times = [];

        for (let i = 1; i <= iterations; i++) {
            ConsoleVisualizer.info(`Iteración ${i}/${iterations}...`);

            const start = Date.now();
            try {
                await fetch(`${this.baseUrl}/api/estadistica`);
                const end = Date.now();

                const time = end - start;
                times.push(time);
                ConsoleVisualizer.data(`  Tiempo ${i}`, `${time}ms`);
            } catch (error) {
                ConsoleVisualizer.error(`Iteración ${i} falló: ${error.message}`);
            }
        }

        if (times.length > 0) {
            const avg = times.reduce((a, b) => a + b, 0) / times.length;
            const min = Math.min(...times);
            const max = Math.max(...times);

            ConsoleVisualizer.section('Resultados de Rendimiento');
            ConsoleVisualizer.data('Tiempo Promedio', `${avg.toFixed(2)}ms`);
            ConsoleVisualizer.data('Tiempo Mínimo', `${min}ms`);
            ConsoleVisualizer.data('Tiempo Máximo', `${max}ms`);

            if (avg < 100) {
                ConsoleVisualizer.success('Rendimiento EXCELENTE (< 100ms)');
            } else if (avg < 500) {
                ConsoleVisualizer.success('Rendimiento BUENO (< 500ms)');
            } else if (avg < 1000) {
                ConsoleVisualizer.warning('Rendimiento REGULAR (< 1s)');
            } else {
                ConsoleVisualizer.error('Rendimiento LENTO (> 1s)');
            }

            return { avg, min, max, times };
        }

        return null;
    }

    async testErrorScenarios() {
        ConsoleVisualizer.section('PRUEBA: Manejo de Errores');

        const scenarios = [
            {
                name: 'Tipo de reporte inválido',
                payload: { reportType: 'invalid_type' },
                expectedStatus: 400
            },
            {
                name: 'Cantidad de usuarios demasiado alta',
                payload: { userCount: 2000 },
                expectedStatus: 400
            },
            {
                name: 'Cantidad de usuarios negativa',
                payload: { userCount: -1 },
                expectedStatus: 400
            },
            {
                name: 'Payload vacío',
                payload: {},
                expectedStatus: 400
            }
        ];

        for (const scenario of scenarios) {
            ConsoleVisualizer.info(`Probando: ${scenario.name}`);

            try {
                const response = await fetch(`${this.baseUrl}/api/estadistica`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(scenario.payload)
                });

                if (response.status === scenario.expectedStatus) {
                    ConsoleVisualizer.success(`Manejo correcto: ${scenario.name}`);
                } else {
                    ConsoleVisualizer.warning(`Status inesperado ${response.status} para: ${scenario.name}`);
                }
            } catch (error) {
                ConsoleVisualizer.error(`Conexión falló para ${scenario.name}: ${error.message}`);
            }
        }

        ConsoleVisualizer.info('Probando servidor no disponible');
        try {
            await fetch('http://localhost:9999/api/estadistica');
        } catch (error) {
            console.error(error)
            ConsoleVisualizer.success('Manejo correcto de servidor no disponible');
        }
    }

    recordTest(testName, passed, error = null) {
        this.results.tests.push({ testName, passed, error });
        if (passed) {
            this.results.passed++;
        } else {
            this.results.failed++;
        }
    }

    showFinalResults() {
        ConsoleVisualizer.header('RESULTADOS FINALES DE PRUEBAS');

        const total = this.results.passed + this.results.failed;
        const successRate = total > 0 ? (this.results.passed / total * 100).toFixed(1) : 0;

        ConsoleVisualizer.data('Pruebas Ejecutadas', total);
        ConsoleVisualizer.data('Pruebas Exitosas', this.results.passed);
        ConsoleVisualizer.data('Pruebas Fallidas', this.results.failed);
        ConsoleVisualizer.data('Tasa de Éxito', `${successRate}%`);

        if (this.results.failed > 0) {
            ConsoleVisualizer.section('PRUEBAS FALLIDAS');
            this.results.tests
                .filter(test => !test.passed)
                .forEach(test => {
                    ConsoleVisualizer.error(`${test.testName}: ${test.error}`);
                });
        }

        if (successRate >= 90) {
            console.log(`\n${colors.green}${colors.bright}EXCELENTE: Todos los sistemas funcionando correctamente${colors.reset}\n`);
        } else if (successRate >= 70) {
            console.log(`\n${colors.yellow}ACEPTABLE: Algunos problemas detectados${colors.reset}\n`);
        } else {
            console.log(`\n${colors.red}CRÍTICO: Múltiples fallos detectados${colors.reset}\n`);
        }
    }
}

// Funciones principales de ejecución
async function runQuickTest() {
    const tester = new StatsAPITester();

    ConsoleVisualizer.header('PRUEBA RÁPIDA - API de Estadísticas');

    await tester.testGetBasicStats();
    await tester.testPostCSVGeneration('specialty', 50);

    tester.showFinalResults();
}

async function runFullTestSuite() {
    const tester = new StatsAPITester();

    ConsoleVisualizer.header('SUITE COMPLETO DE PRUEBAS - API de Estadísticas');

    await tester.testGetBasicStats();
    await tester.testAllCSVTypes();
    await tester.testPerformance(3);
    await tester.testErrorScenarios();

    tester.showFinalResults();
}

async function runCSVPreview(reportType = 'complete', userCount = 100) {
    ConsoleVisualizer.header(`VISTA PREVIA CSV - ${reportType.toUpperCase()}`);

    const tester = new StatsAPITester();
    await tester.testPostCSVGeneration(reportType, userCount);
}

// Exportar para uso como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StatsAPITester,
        ConsoleVisualizer,
        runQuickTest,
        runFullTestSuite,
        runCSVPreview
    };
}

console.log(`
API Stats Tester v2.0

Funciones disponibles:
• runQuickTest()           - Prueba rápida
• runFullTestSuite()       - Suite completo
• runCSVPreview('tipo', cantidad) - Vista previa

Ejemplo de uso:
runFullTestSuite();
`);

// Descomenta para ejecutar automáticamente:
runQuickTest().then();
// runFullTestSuite()