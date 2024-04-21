/**
 * @author - @ElBeenMachine
 */

import Head from "next/head";
import React from "react";

import { Poppins } from "next/font/google";

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
            {children}
        </main>
    );
}

export default MasterPage;
