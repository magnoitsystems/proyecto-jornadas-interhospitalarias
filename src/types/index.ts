// app/types/index.ts
export enum JobType {
    DOCTOR = 'medico',
    STUDENT = 'estudiante',
    NURSE = 'enfermero',
    NON_HEALTH_PROFESSIONAL = 'no perteneciente al área de la salud',
    KINESIOLOGIST = 'kinesiologo',
    SPEECH_THERAPIST = 'fonoaudiologo',
    TECHNICIAN = 'tecnico',
    OTHER = 'otros'
}

export enum WorkCategory {
    QUALITATIVE_RESEARCH = 'investigacion cualitativa',
    QUANTITATIVE_RESEARCH = 'investigacion cuantitativa',
    CASE_PRESENTATION = 'presentacion de casos',
    EXPERIENCE_REPORTS = 'relatos de experiencias'
}

export enum Gender {
    MALE = 'masculino',
    FEMALE = 'femenino',
    OTHER = 'otro',
    PREFER_NOT_TO_SAY = 'prefiero no decir'
}

export interface Origin {
    city: string;
    province: string;
    country: string;
}

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    job: JobType;
    specialty: string | null;
    admin: boolean;
    age: number;
    gender: Gender;
    works?: Work[];
}

export interface Author {
    id: number;
    name: string;
    lastname: string;
    affiliation: string | null;
    workId: number;
}

export interface Work {
    id: number;
    category: WorkCategory;
    description: string;
    userId: number;
    workCode: string;
    title: string;
    file: string | null;
    user?: User;
    authors: Author[];
}

export interface Statistics {
    statistics: string;
    amount: number;
}

// Tipo para el objeto de origen anidado
export type Origen = {
    ciudad: string;
    provincia: string;
    pais: string;
};

// Tipo principal para el objeto del profesional
export type Professional = {
    id: number;
    nombre: string;
    apellido: string;
    imagen: string | null; // La imagen puede ser una URL (string) o no existir (null)
    profesion: string;
    especializacion: string;
    lugarEjerce: string;
    origen: Origen; // Usamos el tipo que definimos arriba
};