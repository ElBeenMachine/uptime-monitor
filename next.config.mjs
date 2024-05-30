/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    async redirects() {
        return [
            {
                source: "/dashboard",
                destination: "/dashboard/home",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
