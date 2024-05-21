"use client";

import MasterPage from "../DashMaster";
import HomeCard from "./HomeCard";
import { useEffect } from "react";
import { useState } from "react";
import { AreaChart, EventProps } from "@tremor/react";
import formatTime from "./uptimeFormatter";
import React from "react";

/**
 * Function to create the dashboard home page.
 *
 * @returns {ReactElement} The dashboard home page
 */
export default function DashboardHome() {
    // State to store the monitors
    const [monitors, setMonitors] = useState([]);
    const [systemUptime, setSystemUptime] = useState(0);
    const [history, setHistory] = useState([]);
    const [graphValue, setGraphValue] = useState<null | EventProps>(null);

    // TODO: Get the session

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
        }, 5000);

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

        // Function to fetch the monitor history
        const fetchHistory = async () => {
            console.log(`[${new Date().toLocaleTimeString()}] Updating History`);
            const res = await fetch("/api/monitors/getHistory");
            const data = await res.json();
            setHistory(data);
        };

        // Fetch the history
        fetchHistory();

        const historyInterval = setInterval(() => {
            fetchHistory();
        }, 30000);

        // Clear the interval
        return () => {
            clearInterval(monitorInterval);
            clearInterval(uptimeInterval);
            clearInterval(historyInterval);
        };
    }, []);

    return (
        <MasterPage>
            <h1 className={"text-4xl mb-4 font-semibold"}>Welcome Back, {"USERNAME"}</h1>
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
                <HomeCard title={"Uptime"} width={"full"}>
                    <div className="bg-[var(--background)] p-5 rounded-md shadow-sm">
                        <AreaChart showAnimation={true} data={history} index="timestamp" categories={["up", "down"]} colors={["green", "red"]} onValueChange={(v: EventProps) => setGraphValue(v)} />
                    </div>
                </HomeCard>
            </div>
        </MasterPage>
    );
}
