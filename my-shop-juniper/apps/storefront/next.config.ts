import {NextConfig} from 'next';

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        // This is necessary to display images from your local Vendure instance
        // dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'vendure-server',  // ← Add this
              port: '3000',
              pathname: '/assets/**',
            },
            {
              protocol: 'http',
              hostname: 'localhost',  // ← Keep this for browser access
              port: '3000',
              pathname: '/assets/**',
            },
        ],
    },
    experimental: {
        rootParams: true
    }
};

export default nextConfig;