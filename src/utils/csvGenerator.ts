// utils/csvGenerator.ts
import {StatsByProfession, StatsByGender, StatsBySpecialty, ProcessedStats, CSVConfig} from '@/types/csv';

export class CSVGenerator {

    /**
     * Convierte array de objetos a CSV
     */
    private static arrayToCSV<T extends Record<string, any>>(
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

    /**
     * Genera CSV de estadísticas por profesión
     */
    static generateProfessionStats(data: StatsByProfession[]): string {
        const headers = [
            { key: 'profession' as keyof StatsByProfession, label: 'Profesión' },
            { key: 'count' as keyof StatsByProfession, label: 'Cantidad' },
            { key: 'genderBreakdown' as keyof StatsByProfession, label: 'Distribución por Género' },
            { key: 'specialties' as keyof StatsByProfession, label: 'Especialidades' }
        ];

        return this.arrayToCSV(data, headers);
    }

    /**
     * Genera CSV de estadísticas por género
     */
    static generateGenderStats(data: StatsByGender[]): string {
        const headers = [
            { key: 'gender' as keyof StatsByGender, label: 'Género' },
            { key: 'count' as keyof StatsByGender, label: 'Cantidad' },
            { key: 'professionBreakdown' as keyof StatsByGender, label: 'Distribución por Profesión' }
        ];

        return this.arrayToCSV(data, headers);
    }

    /**
     * Genera CSV de estadísticas por especialidad
     */
    static generateSpecialtyStats(data: StatsBySpecialty[]): string {
        const headers = [
            { key: 'specialty' as keyof StatsBySpecialty, label: 'Especialidad' },
            { key: 'count' as keyof StatsBySpecialty, label: 'Cantidad' },
            { key: 'professions' as keyof StatsBySpecialty, label: 'Profesiones' },
            { key: 'genderBreakdown' as keyof StatsBySpecialty, label: 'Distribución por Género' }
        ];

        return this.arrayToCSV(data, headers);
    }

    /**
     * Genera reporte completo en un solo CSV
     */
    static generateCompleteReport(stats: {
        totalUsers: number;
        byProfession: StatsByProfession[];
        byGender: StatsByGender[];
        bySpecialty: StatsBySpecialty[];
        adminPercentage: number;
    }): string {
        let report = '';

        // Resumen general
        report += 'RESUMEN GENERAL\n';
        report += 'Métrica,Valor\n';
        report += `Total de Usuarios,${stats.totalUsers}\n`;
        report += `Porcentaje de Administradores,${stats.adminPercentage}%\n`;
        report += '\n\n';

        // Por profesión
        report += 'ESTADÍSTICAS POR PROFESIÓN\n';
        report += this.generateProfessionStats(stats.byProfession);
        report += '\n\n';

        // Por género
        report += 'ESTADÍSTICAS POR GÉNERO\n';
        report += this.generateGenderStats(stats.byGender);
        report += '\n\n';

        // Por especialidad
        report += 'ESTADÍSTICAS POR ESPECIALIDAD\n';
        report += this.generateSpecialtyStats(stats.bySpecialty);

        return report;
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
            output += `Porcentaje administradores: ${data.summary.adminPercentage}%\n\n`;
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
            output += `% Administradores,${data.summary.adminPercentage}\n\n`;
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