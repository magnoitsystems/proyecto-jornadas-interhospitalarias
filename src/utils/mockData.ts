// utils/mockData.ts
import { User, JobType, Gender } from '@/types/user';

export function generateMockUsers(count: number = 150): User[] {
    const specialtiesByJob = {
        [JobType.DOCTOR]: ['cardiología', 'neurología', 'pediatría', 'ginecología', 'traumatología'],
        [JobType.NURSE]: ['cuidados intensivos', 'quirófano', 'urgencias', 'pediatría'],
        [JobType.KINESIOLOGIST]: ['rehabilitación', 'deportiva', 'neurológica'],
        [JobType.SPEECH_THERAPIST]: ['terapia del habla', 'disfagia', 'audiología'],
        [JobType.STUDENT]: ['medicina', 'enfermería', 'kinesiología'],
        [JobType.TECHNICIAN]: ['laboratorio', 'radiología', 'quirófano'],
        [JobType.OTHER]: [null],
        [JobType.NON_HEALTH_PROFESSIONAL]: [null]
    };

    return Array.from({ length: count }, (_, index) => {
        const jobs = Object.values(JobType);
        const genders = Object.values(Gender);
        const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
        const possibleSpecialties = specialtiesByJob[randomJob];

        return {
            id: index + 1,
            name: `Usuario${index + 1}`,
            lastname: `Apellido${index + 1}`,
            email: `user${index + 1}@hospital.com`,
            password: 'hasheado123',
            job: randomJob,
            specialty: possibleSpecialties[Math.floor(Math.random() * possibleSpecialties.length)],
            admin: Math.random() < 0.1,
            age: Math.floor(Math.random() * 40) + 20,
            gender: genders[Math.floor(Math.random() * genders.length)]
        } as User;
    });
}