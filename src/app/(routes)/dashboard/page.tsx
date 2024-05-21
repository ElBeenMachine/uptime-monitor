// Redirect to /dashboard/home
export default {
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
