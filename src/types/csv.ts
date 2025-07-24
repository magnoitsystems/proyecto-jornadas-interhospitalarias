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
    format: string
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