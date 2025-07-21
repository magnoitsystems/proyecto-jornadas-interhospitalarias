// src/auth.config.ts
import type { Session } from 'next-auth';
import type { NextRequest } from 'next/server';

const authConfig = {
    pages: { signIn: '/login' },
    authorized: ({ auth, request }: { auth: Session | null; request: NextRequest }) => {
        const { nextUrl } = request;
        const isLoggedIn = !!auth?.user;
        const isOnAdministration = nextUrl.pathname.startsWith('/administracion');

        if (isOnAdministration) {
            if (isLoggedIn) return true;
            return false;
        }

        else if (isLoggedIn) {
            if (nextUrl.pathname.startsWith('/login')) {
                return Response.redirect(new URL('/administracion', nextUrl));
            }
            return true;
        }

        return true;
    },
    callbacks: {},
    providers: [],
};

export { authConfig };