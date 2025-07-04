
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**', // Permite cualquier ruta de imagen de ese dominio
            },
        ],
    },
};

module.exports = nextConfig;

export default nextConfig;
