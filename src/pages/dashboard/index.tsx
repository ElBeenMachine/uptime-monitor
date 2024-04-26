/**
 * @author - @ElBeenMachine
 */

import MasterPage from "@/components/Layout/Dash/DashMaster";
import { useEffect } from "react";
import { useState } from "react";
import { uptime } from "process";

// Import the package information
import packageInfo from "../../../package.json";
import HomeCard from "@/components/Home/HomeCard";

// Function to format a time string
function formatTime(seconds: number) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    // console.log(d, h, m, s)
    var dDisplay = d > 0 ? d + "d " : "";
    var hDisplay = h > 0 ? h + "h " : "";
    var mDisplay = m > 0 ? m + "m " : "";
    var sDisplay = s > 0 ? s + "s" : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

/**
 * Function to create the dashboard home page.
 *
 * @returns {ReactElement} The dashboard home page
 */
export default function DashboardHome() {
    // State to store the monitors
    const [monitors, setMonitors] = useState([]);
    const [systemUptime, setSystemUptime] = useState(0);

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
        const monitorInterval = setInterval(() => {
            fetchMonitors();
        }, 5000);

        // Update the system uptime every second
        const uptimeInterval = setInterval(() => {
            // Fetch the uptime
            fetch("/api/uptime")
                .then((res) => res.json())
                .then((data) => {
                    setSystemUptime(data.uptime);
                });
        }, 1000);

        // Clear the interval
        return () => {
            clearInterval(monitorInterval);
            clearInterval(uptimeInterval);
        };
    }, []);
    return (
        <MasterPage pageTitle="Dashboard">
            <div className={"flex flex-wrap gap-4"}>
                <HomeCard title="Total Monitors" width={"quarter"}>
                    <div className={"w-full min-h-24 flex flex-col justify-between items-center"}>
                        <span className={"text-5xl"}>{monitors.length}</span>
                        <p className={"mt-3"}>{monitors.length === 1 ? "Monitor" : "Monitors"} Available</p>
                    </div>
                </HomeCard>
                <HomeCard title="Online Monitors" width={"quarter"}>
                    <div className={"w-full min-h-24 flex flex-col justify-between items-center"}>
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
                <HomeCard title="Online Monitors" width={"quarter"}>
                    <div className={"w-full min-h-24 flex flex-col justify-between items-center"}>
                        <span className={"text-5xl"}>
                            {(monitors.filter((x: { status: string }) => {
                                return x.status == "up";
                            }).length /
                                monitors.length) *
                                100 +
                                "%"}
                        </span>
                        <p className={"mt-3"}>Of Monitors Online</p>
                    </div>
                </HomeCard>
                <HomeCard title="System Uptime" width={"quarter"}>
                    <div className={"w-full min-h-24 flex-grow flex justify-center items-center"}>
                        <span className={"text-5xl"}>{formatTime(systemUptime)}</span>
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
