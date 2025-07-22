// utils/csvGenerator.ts
import { StatsByProfession, StatsByGender, StatsBySpecialty } from './statsProcessor';

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
}