// src/lib/actions.ts

'use server';

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth"; // Asegúrate de que esta importación funcione ahora

// Ya no necesitamos Zod ni el tipo State aquí, porque el backend se encarga de todo.

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {

        await signIn('credentials', formData);

    } catch (error) {

        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':

                    return 'Las credenciales proporcionadas son incorrectas.';
                default:

                    return 'Algo salió mal. Por favor, inténtelo de nuevo.';
            }
        }


        throw error;
    }
}

export async function handleSignOut() {
    await signOut({ redirectTo: '/login' });
}