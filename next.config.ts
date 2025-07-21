// next.config.ts

import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // reactStrictMode ayuda a identificar problemas potenciales en la aplicación.
    // Es muy recomendable tenerlo en 'true' durante el desarrollo.
    reactStrictMode: true,

    // configuración de imágenes para permitir dominios externos.
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',

            },

        ],
    },
};

//
export default nextConfig;