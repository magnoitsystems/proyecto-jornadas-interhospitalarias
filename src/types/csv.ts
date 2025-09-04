export interface UserStats {
    profession: string;
    specialty: string | null;
    gender: string;
    count: number;
}

export interface CSVGenerationRequest {
    groupBy: 'profession' | 'specialty' | 'gender' | 'all';
    includeEmpty?: boolean;
}

export interface CSVConfig{
    includeGender: boolean,
    includeSpecialty: boolean,
    includeProfession: boolean,
    healthOnly: boolean,
    format: string,
    // Nueva propiedad para elegir el tipo de CSV
    csvType?: 'individual' | 'aggregated'
}

export interface ProcessedStats {
    summary?: {
        totalUsers: number;
        avgAge: number;
        usersWithSpecialty?: number;
        uniqueSpecialties?: number;
    };
    profession?: StatsByProfession[];
    gender?: StatsByGender[];
    specialty?: StatsBySpecialty[];
}

export interface StatsByProfession {
    profession: string;
    count: number;
    avgAge?: number;
    genderBreakdown: Record<string, number>;
    specialties: Record<string, number>;
}

export interface StatsByGender {
    gender: string;
    count: number;
    professionBreakdown: Record<string, number>;
}

export interface StatsBySpecialty {
    specialty: string;
    count: number;
    professions: Record<string, number>;
    genderBreakdown: Record<string, number>;
}

// Nueva interfaz para datos individuales de usuarios
export interface UserData {
    id: number;
    name: string;
    email: string;
    age: number;
    gender: string;
    job: string;
    specialty: string | null;
}