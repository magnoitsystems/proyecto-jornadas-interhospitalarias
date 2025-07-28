// src/types/next-auth.d.ts

import { DefaultSession, User } from "next-auth";
import "next-auth/jwt";

/**
 * Extiende el objeto User que se retorna del `authorize` callback.
 */
declare module "next-auth" {
    interface User {
        admin?: boolean;
        id: string;
        name: string;
        lastname: string;
    }

    /**
     * Extiende el objeto Session para incluir nuestra propiedad `admin`.
     */
    interface Session {
        user: {
            admin?: boolean;
            id: string;
             name: string;
        lastname: string;
        } & DefaultSession["user"]; // Usa DefaultSession para evitar la referencia circular
    }
}

/**
 * Extiende el token JWT para que también incluya la propiedad `admin`.
 */
declare module "next-auth/jwt" {
    interface JWT {
        admin?: boolean;
        id: string;
         name: string;
        lastname: string;
    }
}