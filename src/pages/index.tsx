import MasterPage from "@/components/Layout/master";

function HomePage() {
    return <MasterPage pageTitle="Home">Loading...</MasterPage>;
}

// Use getServerSideProps to redirect to the dashboard if there are no public facing status pages
export async function getServerSideProps() {
    // TODO: Check if there are any public facing status pages

    // Redirect to the dashboard
    return {
        redirect: {
            destination: "/dashboard",
            permanent: false,
        },
    };
}

export default HomePage;
