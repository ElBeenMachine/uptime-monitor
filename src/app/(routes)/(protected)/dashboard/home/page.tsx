import MasterPage from "../DashMaster";
import React from "react";
import SystemInfo from "./SystemInfo";
import getSession from "@/lib/getSession";

/**
 * Function to create the dashboard home page.
 *
 * @returns {ReactElement} The dashboard home page
 */
export default async function DashboardHome() {
    const { user, session } = await getSession();

    return (
        <MasterPage>
            <h1 className={"text-4xl mb-4 font-semibold"}>Welcome Back, {user?.firstName}</h1>
            <SystemInfo />
        </MasterPage>
    );
}
