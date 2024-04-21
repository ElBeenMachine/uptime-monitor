/**
 * @author - @ElBeenMachine
 */

import MasterPage from "@/components/Layout/Dash/DashMaster";
import { useEffect } from "react";
import { useState } from "react";

// Import the package information
import packageInfo from "../../../package.json";

interface HomeCardProps {
    title: string;
    width?: "full" | "half" | "third";
    children: React.ReactNode;
}

/**
 *
 * @param {HomeCardProps} props The props for the home card
 * @returns {ReactElement} The home card
 */
function HomeCard({ title, width = "full", children }: HomeCardProps) {
    let widthClass;

    switch (width) {
        case "full":
            widthClass = "w-full";
            break;
        case "half":
            widthClass = "w-full lg:w-[calc((100%/2)-8px)]";
            break;
        case "third":
            widthClass = "w-full lg:w-[calc((100%/2)-8px)] xl:w-[calc((100%/3)-11px)]";
            break;
    }

    return (
        <div className={`bg-[var(--background-alt)] shadow-lg rounded-lg p-4 ${widthClass} select-none`}>
            <h2 className="text-xl font-semibold w-full mb-4">{title}</h2>
            {children}
        </div>
    );
}

/**
 * Function to create the dashboard home page.
 *
 * @returns {ReactElement} The dashboard home page
 */
export default function DashboardHome() {
    // State to store the monitors
    const [monitors, setMonitors] = useState([]);

    useEffect(() => {
        // Fetch the monitors
        const fetchMonitors = async () => {
            const res = await fetch("/api/monitors/getAll");
            const data = await res.json();
            setMonitors(data.monitors);
        };

        // Log the monitors
        fetchMonitors();
    }, []);
    return (
        <MasterPage pageTitle="Dashboard">
            <div className={"flex flex-wrap gap-4"}>
                <HomeCard title="Monitors" width={"third"}>
                    <div className={"w-full min-h-12 text-center"}>
                        <span className={"text-5xl"}>{monitors.length}</span>
                        <p className={"mt-3"}>{monitors.length === 1 ? "Monitor" : "Monitors"} Available</p>
                    </div>
                </HomeCard>
            </div>

            <div className={"flex-grow"}></div>

            <div className={"text-center pt-5 w-full"}>
                <p>
                    ♥ Powered by{" "}
                    <a href={"https://www.github.com/ElBeenMachine/uptime-monitor"} className={"underline"} target={"_blank"}>
                        {packageInfo.name} v{packageInfo.version}
                    </a>
                </p>
            </div>
        </MasterPage>
    );
}
