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
import { AreaChart, Card, EventProps } from "@tremor/react";

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
    return dDisplay + (!d ? hDisplay : "") + (!d ? mDisplay : "") + (!h ? sDisplay : "");
}

const data = [
    {
        month: "January",
        rain: 2.8,
        snow: 17.3,
    },
    {
        month: "February",
        rain: 1.2,
        snow: 8.9,
    },
    {
        month: "March",
        rain: 3.1,
        snow: 5.2,
    },
    {
        month: "April",
        rain: 4.5,
        snow: 0.1,
    },
    {
        month: "May",
        rain: 5.2,
        snow: 0.0,
    },
    {
        month: "June",
        rain: 4.8,
        snow: 0.0,
    },
    {
        month: "July",
        rain: 3.9,
        snow: 0.0,
    },
    {
        month: "August",
        rain: 3.4,
        snow: 0.0,
    },
    {
        month: "September",
        rain: 2.9,
        snow: 0.0,
    },
    {
        month: "October",
        rain: 2.3,
        snow: 1.4,
    },
    {
        month: "November",
        rain: 1.8,
        snow: 7.5,
    },
    {
        month: "December",
        rain: 1.5,
        snow: 12.8,
    },
    {
        month: "January",
        rain: 2.8,
        snow: 17.3,
    },
    {
        month: "February",
        rain: 1.2,
        snow: 8.9,
    },
    {
        month: "March",
        rain: 3.1,
        snow: 5.2,
    },
    {
        month: "April",
        rain: 4.5,
        snow: 0.1,
    },
    {
        month: "May",
        rain: 5.2,
        snow: 0.0,
    },
    {
        month: "June",
        rain: 4.8,
        snow: 0.0,
    },
    {
        month: "July",
        rain: 3.9,
        snow: 0.0,
    },
    {
        month: "August",
        rain: 3.4,
        snow: 0.0,
    },
    {
        month: "September",
        rain: 2.9,
        snow: 0.0,
    },
    {
        month: "October",
        rain: 2.3,
        snow: 1.4,
    },
    {
        month: "November",
        rain: 1.8,
        snow: 7.5,
    },
    {
        month: "December",
        rain: 1.5,
        snow: 12.8,
    },
];

function AreaChartDemo() {
    const [value, setValue] = useState<null | EventProps>(null);
    return (
        <div className="not-prose">
            <Card>
                <AreaChart data={data} index="month" categories={["rain", "snow"]} onValueChange={(v: EventProps) => setValue(v)} />
            </Card>
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
                        <span className={"text-5xl"}>{systemUptime == 0 ? "Loading..." : formatTime(systemUptime)}</span>
                    </div>
                </HomeCard>
                <HomeCard title={"Uptime"} width={"full"}>
                    <AreaChartDemo />
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
