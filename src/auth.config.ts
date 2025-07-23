// src/auth.config.ts

import type { NextRequest } from 'next/server';
// ✅ PASO 1: IMPORTA LOS TIPOS NECESARIOS
import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authConfig = {
    pages: { signIn: '/login' },
    callbacks: {
        authorized({ auth, request }: { auth: Session | null; request: NextRequest }) {
            const { nextUrl } = request;
            const isLoggedIn = !!auth?.user;
            const userIsAdmin = auth?.user?.admin === true;

            const isOnAdminPanel = nextUrl.pathname.startsWith('/adminPanel');
            const isOnTrabajos = nextUrl.pathname.startsWith('/trabajos');
            const isOnLoginPage = nextUrl.pathname.startsWith('/login');

            if (!isLoggedIn) {
                if (isOnAdminPanel || isOnTrabajos) return false;
                return true;
            }

            if (isOnLoginPage) {
                const redirectTo = userIsAdmin ? '/adminPanel' : '/trabajos';
                return Response.redirect(new URL(redirectTo, nextUrl));
            }

            if (userIsAdmin && isOnTrabajos) {
                return Response.redirect(new URL('/adminPanel', nextUrl));
            }

            if (!userIsAdmin && isOnAdminPanel) {
                return Response.redirect(new URL('/trabajos', nextUrl));
            }

            return true;
        },

        // ✅ PASO 2: AÑADE LOS TIPOS EXPLÍCITAMENTE
        jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                // Ahora token.admin y user.admin son completamente type-safe
                token.admin = user.admin;
                token.id = user.id;
            }
            return token;
        },

        // ✅ PASO 3: AÑADE LOS TIPOS EXPLÍCITAMENTE
        session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                // Ahora session.user.admin y token.admin son completamente type-safe
                session.user.admin = token.admin;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    providers: [],
};