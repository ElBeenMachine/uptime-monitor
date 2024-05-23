"use client";

import { AreaChart, EventProps } from "@tremor/react";
import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";

export default function HomeUptimeGraph() {
    const [history, setHistory] = useState([]);
    const [graphValue, setGraphValue] = useState<null | EventProps>(null);

    useEffect(() => {
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

        return () => {
            clearInterval(historyInterval);
        };
    }, []);

    return (
        <HomeCard title={"Uptime"} width={"full"}>
            <div className="bg-[var(--background)] p-5 rounded-md shadow-sm">
                <AreaChart showAnimation={true} data={history} index="timestamp" categories={["up", "down"]} colors={["green", "red"]} onValueChange={(v: EventProps) => setGraphValue(v)} />
            </div>
        </HomeCard>
    );
}
