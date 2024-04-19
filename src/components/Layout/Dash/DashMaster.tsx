import Head from "next/head";
import React from "react";

import { Poppins } from "next/font/google";
import DashNav from "./DashNav";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface MasterPageProps {
    children?: React.ReactNode;
    pageTitle: string;
}

function MasterPage({ children, pageTitle }: MasterPageProps) {
    return (
        <main className={`${poppins.variable}`}>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <div id={"dash-viewport"} className={"w-full flex flex-nowrap"}>
                <DashNav />
                <div id={"dash-content"} className={"w-full p-3"}>
                    {children}
                </div>
            </div>
        </main>
    );
}

export default MasterPage;
