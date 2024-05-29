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
    const { user } = await getSession();

    function getGreeting() {
        "use client";
        const today = new Date();
        const curHr = today.getHours();

        if (curHr < 12) {
            return `Good morning, ${user?.firstName}!`;
        } else if (curHr < 18) {
            return `Good afternoon, ${user?.firstName}!`;
        } else {
            return `Good evening, ${user?.firstName}!`;
        }
    }

    return (
        <MasterPage>
            <h1 className={"text-3xl mb-4 font-semibold"}>{getGreeting()}</h1>
            <SystemInfo />
        </MasterPage>
    );
}
