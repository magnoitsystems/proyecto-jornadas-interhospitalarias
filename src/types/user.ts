import { Work } from "@/types/index";

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    job: string;
    specialty?: string | null;
    admin: boolean;
    age: number;
    gender: string;
    works?: Work[];
}

export interface CreateUserData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    job: JobType;
    specialty?: string | null;
    admin?: boolean;
    age: number;
    gender: string;
}

export enum Gender {
    MALE = 'masculino',
    FEMALE = 'femenino',
    OTHER = 'otro',
    PREFER_NOT_TO_SAY = 'prefiero no decir'
}

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

