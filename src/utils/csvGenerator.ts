import { ProcessedStats, CSVConfig } from '@/types/csv';

export class CSVGenerator {

    /**
     * Convierte array de objetos a CSV
     */
    private static arrayToCSV<T extends Record<string, unknown>>(
        data: T[],
        headers: Array<{ key: keyof T; label: string }>
    ): string {
        if (data.length === 0) {
            return 'Sin datos disponibles\n';
        }

        const headerRow = headers.map(h => h.label).join(',');

        const dataRows = data.map(item => {
            return headers.map(header => {
                const value = item[header.key];

                // Manejo de objetos anidados
                if (typeof value === 'object' && value !== null) {
                    const entries = Object.entries(value);
                    return `"${entries.map(([k, v]) => `${k}: ${v}`).join('; ')}"`;
                }

                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }

                return value?.toString() || '';
            }).join(',');
        }).join('\n');

        return `${headerRow}\n${dataRows}\n`;
    }

    static generateWithConfig(data: ProcessedStats, config: CSVConfig): string {
        if (config.format === 'readable') {
            return this.generateReadableFormat(data, config);
        }

        // Fallback al formato compacto existente
        return this.generateCompactFormat(data, config);
    }

    private static generateReadableFormat(data: ProcessedStats, config: CSVConfig): string {
        let output = '';

        // Resumen general
        if (data.summary) {
            output += 'RESUMEN GENERAL\n';
            output += '================\n';
            output += `Total de usuarios: ${data.summary.totalUsers}\n`;
            output += `Edad promedio: ${data.summary.avgAge} años\n`;
        }

        // Estadísticas por profesión
        if (data.profession && config.includeProfession) {
            output += 'ESTADÍSTICAS POR PROFESIÓN\n';
            output += '==========================\n';
            data.profession.forEach(prof => {
                output += `${prof.profession}: ${prof.count} personas\n`;
            });
            output += '\n';
        }

        // Estadísticas por género
        if (data.gender && config.includeGender) {
            output += 'ESTADÍSTICAS POR GÉNERO\n';
            output += '=======================\n';
            data.gender.forEach(gender => {
                output += `${gender.gender}: ${gender.count} personas\n`;
            });
            output += '\n';
        }

        // Estadísticas por especialidad
        if (data.specialty && config.includeSpecialty) {
            output += 'ESTADÍSTICAS POR ESPECIALIDAD\n';
            output += '=============================\n';
            data.specialty.forEach(spec => {
                output += `${spec.specialty}: ${spec.count} personas\n`;
            });
            output += '\n';
        }

        return output;
    }

    private static generateCompactFormat(data: ProcessedStats, config: CSVConfig): string {
        let output = '';

        // Resumen
        if (data.summary) {
            output += 'RESUMEN\n';
            output += 'Métrica,Valor\n';
            output += `Total Usuarios,${data.summary.totalUsers}\n`;
            output += `Edad Promedio,${data.summary.avgAge}\n`;
        }

        // Por profesión
        if (data.profession && config.includeProfession) {
            output += 'PROFESIONES\n';
            output += 'Profesión,Cantidad\n';
            data.profession.forEach(prof => {
                output += `${prof.profession},${prof.count}\n`;
            });
            output += '\n';
        }

        // Por género
        if (data.gender && config.includeGender) {
            output += 'GÉNEROS\n';
            output += 'Género,Cantidad\n';
            data.gender.forEach(gender => {
                output += `${gender.gender},${gender.count}\n`;
            });
            output += '\n';
        }

        // Por especialidad
        if (data.specialty && config.includeSpecialty) {
            output += 'ESPECIALIDADES\n';
            output += 'Especialidad,Cantidad\n';
            data.specialty.forEach(spec => {
                output += `${spec.specialty},${spec.count}\n`;
            });
            output += '\n';
        }

        return output;
    }

}