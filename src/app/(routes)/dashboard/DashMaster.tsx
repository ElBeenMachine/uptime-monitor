/**
 * @author - @ElBeenMachine
 */
import React from "react";

import { Poppins } from "next/font/google";
import DashNav from "./DashNav";
import DashTabs from "./DashTabs";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface MasterPageProps {
    children?: React.ReactNode;
}

export default function MasterPage({ children }: MasterPageProps) {
    return (
        <main className={`${poppins.variable}`}>
            <div id={"dash-viewport"} className={"w-full h-[100dvh] flex flex-nowrap flex-col md:flex-row"}>
                <DashNav />
                <div id={"dash-content"} className={"w-full h-full p-4 flex flex-col overflow-auto"}>
                    {children}
                </div>
                <DashTabs />
            </div>
        </main>
    );
}
