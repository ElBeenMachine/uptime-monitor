/**
 * @author - @ElBeenMachine
 */

import MasterPage from "@/components/Layout/Dash/DashMaster";
import { useEffect } from "react";
import { useState } from "react";

// Import the package information
import packageInfo from "../../../package.json";
import HomeCard from "@/components/Home/HomeCard";

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
            console.log(`[${new Date().toLocaleTimeString()}] Updating Monitors`);
            const res = await fetch("/api/monitors/getAll");
            const data = await res.json();
            setMonitors(data.monitors);
        };

        // Log the monitors
        fetchMonitors();

        // Fetch the monitors every 5 seconds
        const interval = setInterval(() => {
            fetchMonitors();
        }, 5000);

        // Clear the interval
        return () => clearInterval(interval);
    }, []);
    return (
        <MasterPage pageTitle="Dashboard">
            <div className={"flex flex-wrap gap-4"}>
                <HomeCard title="Total Monitors" width={"quarter"}>
                    <div className={"w-full min-h-12 text-center"}>
                        <span className={"text-5xl"}>{monitors.length}</span>
                        <p className={"mt-3"}>{monitors.length === 1 ? "Monitor" : "Monitors"} Available</p>
                    </div>
                </HomeCard>
                <HomeCard title="Online Monitors" width={"quarter"}>
                    <div className={"w-full min-h-12 text-center"}>
                        <span className={"text-5xl"}>
                            {
                                monitors.filter((x: { status: string }) => {
                                    return x.status == "up";
                                }).length
                            }
                        </span>
                        <p className={"mt-3"}>{monitors.length === 1 ? "Monitor" : "Monitors"} Online</p>
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
