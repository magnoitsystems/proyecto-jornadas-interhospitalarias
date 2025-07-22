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