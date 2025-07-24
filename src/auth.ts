import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config'; // Importamos la configuración centralizada
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUser } from '@/libs/data'; // Corregí la ruta a 'lib/data' que tenías en page.tsx

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig, // Usamos el spread para incluir pages y TODOS los callbacks
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            // El provider no necesita 'credentials' aquí porque el formulario lo maneja
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password: inputPassword } = parsedCredentials.data;
                const userFromDb = await getUser(email);

                if (!userFromDb) return null;

                // ¡IMPORTANTE! Asegúrate de que las contraseñas en tu BD están hasheadas con bcrypt
                const passwordsMatch = await bcrypt.compare(inputPassword, userFromDb.password);

                if (passwordsMatch) {
                    // El objeto que retornas aquí se pasa al callback 'jwt'
                    return {
                        id: userFromDb.id.toString(),
                        email: userFromDb.email,
                        name: `${userFromDb.name} ${userFromDb.lastname}`,
                        admin: userFromDb.admin, // Esta es la propiedad crucial
                    };
                }
                return null;
            },
        }),
    ],
});