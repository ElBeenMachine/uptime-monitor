import MasterPage from "@/components/Layout/Basic/BasicMaster";

function HomePage() {
    return (
        <MasterPage pageTitle="Error 404 | Page Not Found">
            <div className={"w-full h-[100dvh] flex flex-col gap-3 items-center justify-center p-10"}>
                <h1 className={"font-black text-3xl"}>404 - Page Not Found</h1>

                <p>The page you are looking for does not exist.</p>

                <a className={"underline"} href={"/"}>
                    Go back to the home page
                </a>
            </div>
        </MasterPage>
    );
}

export default HomePage;
