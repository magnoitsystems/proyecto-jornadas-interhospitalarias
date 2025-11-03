import { ProcessedStats, CSVConfig, UserData } from '@/types/csv';

export class CSVGenerator {

    private static escapeCSVValue(value: unknown): string {
        if (value === null || value === undefined) {
            return '';
        }
        
        const stringValue = String(value);
        
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
    }

    static generateUserDataCSV(users: UserData[], config: CSVConfig): string {
        if (users.length === 0) {
            return 'Sin datos disponibles\n';
        }

        const columns: Array<{key: keyof UserData, label: string}> = [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Nombre' },
            {key: 'lastname', label: 'Apellido'},
            { key: 'email', label: 'Email' },
            { key: 'age', label: 'Edad' }
        ];

        if (config.includeProfession) {
            columns.push({ key: 'job', label: 'Profesión' });
        }

        if (config.includeGender) {
            columns.push({ key: 'gender', label: 'Género' });
        }

        if (config.includeSpecialty) {
            columns.push({ key: 'specialty', label: 'Especialidad' });
        }


        const header = columns.map(col => this.escapeCSVValue(col.label)).join(',');

        const rows = users.map(user => {
            return columns.map(col => {
                let value = user[col.key];
                
                if (col.key === 'specialty' && !value) {
                    value = 'Sin especialidad';
                }
                
                return this.escapeCSVValue(value);
            }).join(',');
        });

        return header + '\n' + rows.join('\n') + '\n';
    }

    private static arrayToCSV<T extends Record<string, unknown>>(
        data: T[],
        headers: Array<{ key: keyof T; label: string }>
    ): string {
        if (data.length === 0) {
            return 'Sin datos disponibles\n';
        }

        const headerRow = headers.map(h => this.escapeCSVValue(h.label)).join(',');

        const dataRows = data.map(item => {
            return headers.map(header => {
                const value = item[header.key];

                if (typeof value === 'object' && value !== null) {
                    const entries = Object.entries(value);
                    return this.escapeCSVValue(entries.map(([k, v]) => `${k}: ${v}`).join('; '));
                }

                return this.escapeCSVValue(value);
            }).join(',');
        }).join('\n');

        return `${headerRow}\n${dataRows}\n`;
    }

    static generateWithConfig(data: ProcessedStats | UserData[], config: CSVConfig): string {
        if (Array.isArray(data)) {
            return this.generateUserDataCSV(data, config);
        }

        if (config.format === 'readable') {
            return this.generateReadableFormat(data, config);
        }

        return this.generateCompactFormat(data, config);
    }

    private static generateReadableFormat(data: ProcessedStats, config: CSVConfig): string {
        let output = '';

        if (data.summary) {
            output += 'RESUMEN GENERAL\n';
            output += '================\n';
            output += `Total de usuarios: ${data.summary.totalUsers}\n`;
            output += `Edad promedio: ${data.summary.avgAge} años\n`;
            output += '\n';
        }

        if (data.profession && config.includeProfession) {
            output += 'ESTADÍSTICAS POR PROFESIÓN\n';
            output += '==========================\n';
            data.profession.forEach(prof => {
                output += `${prof.profession}: ${prof.count} personas\n`;
            });
            output += '\n';
        }

        if (data.gender && config.includeGender) {
            output += 'ESTADÍSTICAS POR GÉNERO\n';
            output += '=======================\n';
            data.gender.forEach(gender => {
                output += `${gender.gender}: ${gender.count} personas\n`;
            });
            output += '\n';
        }

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

        if (data.summary) {
            output += 'RESUMEN\n';
            output += 'Métrica,Valor\n';
            output += `Total Usuarios,${data.summary.totalUsers}\n`;
            output += `Edad Promedio,${data.summary.avgAge}\n`;
            output += '\n';
        }

        if (data.profession && config.includeProfession) {
            output += 'PROFESIONES\n';
            output += 'Profesión,Cantidad\n';
            data.profession.forEach(prof => {
                output += `${prof.profession},${prof.count}\n`;
            });
            output += '\n';
        }

        if (data.gender && config.includeGender) {
            output += 'GÉNEROS\n';
            output += 'Género,Cantidad\n';
            data.gender.forEach(gender => {
                output += `${gender.gender},${gender.count}\n`;
            });
            output += '\n';
        }

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