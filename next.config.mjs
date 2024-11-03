/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/**'
            },
        ],
    },
    env: {
        TMDB_API_KEY: process.env.TMDB_API_KEY,
    },
};


export default nextConfig;
