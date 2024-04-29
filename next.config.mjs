/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/avif","image/webp"],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'i.imgur.com',
            port: "",
            pathname: "/**"
        }]
    }
};

export default nextConfig;
