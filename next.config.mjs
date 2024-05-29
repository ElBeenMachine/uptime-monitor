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
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
};

export default nextConfig;
