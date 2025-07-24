import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    // 👇 Desactiva Turbopack explícitamente
    experimental: {
        turbo: false,
    },
};

export default nextConfig;
