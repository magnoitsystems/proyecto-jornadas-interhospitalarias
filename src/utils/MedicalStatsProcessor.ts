import { User } from '@/types/user';
import { StatsByGender, StatsBySpecialty, ProcessedStats, CSVConfig } from '@/types/csv';
import { prisma } from '@/libs/prisma';


export class MedicalStatsProcessor {

    constructor() {

    }

	async getStatsWithConfig(config: CSVConfig): Promise<ProcessedStats> {
		const result: ProcessedStats = {};

		// Filtro base según configuración
		const baseFilter = config.healthOnly
			? { job: { not: 'no perteneciente al área de la salud' }, admin: false }
			: { admin: false };

		// PROFESIONES - Con el poder de Prisma groupBy
		if (config.includeProfession) {
			const professionStats = await prisma.user.groupBy({
				by: ['job'],
				where: baseFilter,
				_count: { job: true },
				_avg: { age: true }
			});

			result.profession = await Promise.all(
				professionStats.map(async (stat) => {
					// Gender breakdown para cada profesión
					const genderBreakdown = await prisma.user.groupBy({
						by: ['gender'],
						where: { ...baseFilter, job: stat.job },
						_count: { gender: true }
					});

					// Specialty breakdown
					const specialtyBreakdown = await prisma.user.groupBy({
						by: ['specialty'],
						where: {
							...baseFilter,
							job: stat.job,
							specialty: { not: null }
						},
						_count: { specialty: true }
					});

					return {
						profession: stat.job || 'sin definir',
						count: stat._count.job,
						avgAge: Math.round((stat._avg.age || 0) * 100) / 100,
						genderBreakdown: Object.fromEntries(
							genderBreakdown.map(g => [g.gender || 'no especificado', g._count.gender])
						),
						specialties: Object.fromEntries(
							specialtyBreakdown.map(s => [s.specialty!, s._count.specialty])
						)
					};
				})
			);
		}

		// GÉNEROS - Prisma siendo sexy con sus agregaciones
		if (config.includeGender) {
			const genderStats = await prisma.user.groupBy({
				by: ['gender'],
				where: baseFilter,
				_count: { gender: true }
			});

			result.gender = await Promise.all(
				genderStats.map(async (stat) => {
					const professionBreakdown = await prisma.user.groupBy({
						by: ['job'],
						where: { ...baseFilter, gender: stat.gender },
						_count: { job: true }
					});

					return {
						gender: stat.gender || 'no especificado',
						count: stat._count.gender,
						professionBreakdown: Object.fromEntries(
							professionBreakdown.map(p => [p.job || 'sin definir', p._count.job])
						)
					};
				})
			);
		}

		// ESPECIALIDADES - Solo usuarios con specialty
		if (config.includeSpecialty) {
			const specialtyStats = await prisma.user.groupBy({
				by: ['specialty'],
				where: {
					...baseFilter,
					specialty: { not: null }
				},
				_count: { specialty: true }
			});

			result.specialty = await Promise.all(
				specialtyStats.map(async (stat) => {
					const professionBreakdown = await prisma.user.groupBy({
						by: ['job'],
						where: { ...baseFilter, specialty: stat.specialty },
						_count: { job: true }
					});

					const genderBreakdown = await prisma.user.groupBy({
						by: ['gender'],
						where: { ...baseFilter, specialty: stat.specialty },
						_count: { gender: true }
					});

					return {
						specialty: stat.specialty!,
						count: stat._count.specialty,
						professions: Object.fromEntries(
							professionBreakdown.map(p => [p.job || 'sin definir', p._count.job])
						),
						genderBreakdown: Object.fromEntries(
							genderBreakdown.map(g => [g.gender || 'no especificado', g._count.gender])
						)
					};
				})
			);
		}

		// RESUMEN GENERAL
		const totalUsers = await prisma.user.count({ where: baseFilter });
		const avgAgeResult = await prisma.user.aggregate({
			where: baseFilter,
			_avg: { age: true }
		});
		const usersWithSpecialty = await prisma.user.count({
			where: { ...baseFilter, specialty: { not: null } }
		});
		const uniqueSpecialties = await prisma.user.findMany({
			where: { ...baseFilter, specialty: { not: null } },
			select: { specialty: true },
			distinct: ['specialty']
		});

		result.summary = {
			totalUsers,
			avgAge: Math.round((avgAgeResult._avg.age || 0) * 100) / 100,
			usersWithSpecialty,
			uniqueSpecialties: uniqueSpecialties.length
		};

		return result;
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