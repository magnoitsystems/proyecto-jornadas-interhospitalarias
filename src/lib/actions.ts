// src/lib/actions.ts

'use server';

import { signIn, signOut } from "@/auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        //  verificamos si el error es un objeto y tiene un 'message'
        if (error && typeof error === 'object' && 'message' in error) {
            const message = (error as Error).message;
            if (message.includes('CredentialsSignin')) {
                return 'Las credenciales proporcionadas son incorrectas.';
            }
        }
        // Para cualquier otro tipo de error, o si el error no tiene el formato esperado
        return 'Algo salió mal. Por favor, inténtelo de nuevo.';
    }
}

export async function handleSignOut() {
    await signOut({ redirectTo: '/login' });
}