// utils/MedicalStatsProcessor.ts
import { User } from '@/types/user';
import { StatsByProfession, StatsByGender, StatsBySpecialty, ProcessedStats, CSVConfig } from '@/types/csv'


export class MedicalStatsProcessor {
    private users: User[];

    constructor(users: User[]) {
        this.users = users;

        if (!users || users.length === 0) {
            throw new Error('No hay usuarios para procesar.');
        }
    }

    getStatsWithConfig(config: CSVConfig): ProcessedStats {
        // Filtrar usuarios según configuración
        const usersToProcess = config.healthOnly
            ? this.users.filter(user => user.job !== 'no perteneciente al área de la salud')
            : this.users;

        const result: ProcessedStats = {};

        // Incluir datos según configuración
        if (config.includeProfession)
            result.profession = this.processStatsByProfession(usersToProcess);

        if (config.includeGender)
            result.gender = this.processStatsByGender(usersToProcess);

        if (config.includeSpecialty)
            result.specialty = this.processStatsBySpecialty(usersToProcess);


        // Siempre incluir resumen básico
        result.summary = {
            totalUsers: usersToProcess.length,
            avgAge: Math.round(usersToProcess.reduce((sum, u) => sum + (u.age || 0), 0) / usersToProcess.length * 100) / 100,
            usersWithSpecialty: usersToProcess.filter(u => u.specialty).length,
            uniqueSpecialties: [...new Set(usersToProcess.map(u => u.specialty).filter(Boolean))].length
        };

        return result;
    }

    private processStatsByProfession(users: User[]): StatsByProfession[] {
        const professionMap = new Map<string, {
            users: User[],
            genderCount: Record<string, number>,
            specialtyCount: Record<string, number>
        }>();

        users.forEach(user => {
            const profession = user.job || 'sin definir';

            if (!professionMap.has(profession)) {
                professionMap.set(profession, {
                    users: [],
                    genderCount: {},
                    specialtyCount: {}
                });
            }

            const profData = professionMap.get(profession)!;
            profData.users.push(user);

            const gender = user.gender || 'no especificado';
            profData.genderCount[gender] = (profData.genderCount[gender] || 0) + 1;

            if (user.specialty) {
                profData.specialtyCount[user.specialty] = (profData.specialtyCount[user.specialty] || 0) + 1;
            }
        });

        return Array.from(professionMap.entries()).map(([profession, data]) => ({
            profession,
            count: data.users.length,
            genderBreakdown: data.genderCount,
            specialties: data.specialtyCount
        }));
    }

    private processStatsByGender(users: User[]): StatsByGender[] {
        const genderMap = new Map<string, {
            users: User[],
            professionCount: Record<string, number>
        }>();

        users.forEach(user => {
            const gender = user.gender || 'no especificado';

            if (!genderMap.has(gender)) {
                genderMap.set(gender, {
                    users: [],
                    professionCount: {}
                });
            }

            const genderData = genderMap.get(gender)!;
            genderData.users.push(user);

            const profession = user.job || 'sin definir';
            genderData.professionCount[profession] = (genderData.professionCount[profession] || 0) + 1;
        });

        return Array.from(genderMap.entries()).map(([gender, data]) => ({
            gender,
            count: data.users.length,
            professionBreakdown: data.professionCount
        }));
    }

    private processStatsBySpecialty(users: User[]): StatsBySpecialty[] {
        const usersWithSpecialty = users.filter(user => user.specialty);

        const specialtyMap = new Map<string, {
            users: User[],
            professionCount: Record<string, number>,
            genderCount: Record<string, number>
        }>();

        usersWithSpecialty.forEach(user => {
            const specialty = user.specialty!;

            if (!specialtyMap.has(specialty)) {
                specialtyMap.set(specialty, {
                    users: [],
                    professionCount: {},
                    genderCount: {}
                });
            }

            const specialtyData = specialtyMap.get(specialty)!;
            specialtyData.users.push(user);

            const profession = user.job || 'sin definir';
            specialtyData.professionCount[profession] = (specialtyData.professionCount[profession] || 0) + 1;

            const gender = user.gender || 'no especificado';
            specialtyData.genderCount[gender] = (specialtyData.genderCount[gender] || 0) + 1;
        });

        return Array.from(specialtyMap.entries()).map(([specialty, data]) => ({
            specialty,
            count: data.users.length,
            professions: data.professionCount,
            genderBreakdown: data.genderCount
        }));
    }
}