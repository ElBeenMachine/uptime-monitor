"use client";

import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import formatTime from "@/lib/uptimeFormatter";
import Monitors from "./Monitors";
import { DonutChart, Legend } from "@tremor/react";

export default function SystemInfo() {
    // State to store the monitors
    const [monitors, setMonitors] = useState([]);
    const [systemUptime, setSystemUptime] = useState(0);

    useEffect(() => {
        // Function to fetch the monitors
        const fetchMonitors = async () => {
            console.log(`[${new Date().toLocaleTimeString()}] Updating Monitors`);
            const res = await fetch("/api/monitors/getAll");
            const data = await res.json();
            setMonitors(data.monitors);
        };

        // Fetch the monitors
        fetchMonitors();

        // Fetch the monitors every 5 seconds
        const monitorInterval = setInterval(() => {
            fetchMonitors();
        }, 10000);

        // Fetch the uptime
        let uptimeInterval: any;
        fetch("/api/uptime")
            .then((res) => res.json())
            .then((data) => {
                setSystemUptime(data.uptime);
                uptimeInterval = setInterval(() => {
                    setSystemUptime((uptime) => uptime + 1);
                }, 1000);
            });

        // Clear the interval
        return () => {
            clearInterval(monitorInterval);
            clearInterval(uptimeInterval);
        };
    }, []);

    const valueFormatter = (number: number) => `${number} ${number === 1 ? "Monitor" : "Monitors"}`;

    return (
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
                        {Math.floor(
                            (monitors.filter((x: { status: string }) => {
                                return x.status == "up";
                            }).length /
                                monitors.length) *
                                100
                        ) + "%"}
                    </span>
                    <p className={"mt-3"}>Of Monitors Online</p>
                </div>
            </HomeCard>
            <HomeCard title="System Uptime" width={"quarter"}>
                <div className={"w-full min-h-24 flex-grow flex justify-center items-center"}>
                    <span className={"text-5xl"}>{systemUptime == 0 ? "Loading..." : formatTime(systemUptime)}</span>
                </div>
            </HomeCard>
            <Monitors monitors={monitors} />
            <HomeCard title="Status" width={"half"}>
                <DonutChart
                    data={[
                        { name: "Up", value: monitors.filter((x: { status: string }) => x.status == "up").length },
                        { name: "Down", value: monitors.filter((x: { status: string }) => x.status == "down").length },
                        { name: "Pending", value: monitors.filter((x: { status: string }) => x.status == "pending").length },
                    ]}
                    showAnimation={true}
                    colors={["green", "red", "orange"]}
                    valueFormatter={valueFormatter}
                />

                <div className={"flex-grow"}></div>

                <Legend
                    categories={["Up", "Down", "Pending"]}
                    colors={["green", "red", "orange"]}
                    className="flex gap-3 justify-center w-full mt-5 mb-3"
                />
            </HomeCard>
        </div>
    );
}
