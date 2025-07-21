// app/types/index.ts
export type User = {
    id_admin: number;
    admin_email: string;
    admin_password: string;
};

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