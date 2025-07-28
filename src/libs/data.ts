import postgres from 'postgres';
import {UserLogin as AppUser} from '@/types/user'; // Asegúrate que la ruta a tus tipos es correcta

// Inicializamos la conexión a la BD aquí
const sql = postgres(process.env.DATABASE_URL!);

// La función para obtener el usuario ahora vive aquí
export async function getUser(email: string): Promise<AppUser | undefined> {
    try {
        const users = await sql<AppUser[]>`SELECT * FROM "user" WHERE email=${email}`;
        return users[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}