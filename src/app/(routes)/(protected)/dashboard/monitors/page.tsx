"use client";

import { useEffect, useState } from "react";
import MasterPage from "../DashMaster";
import { toast } from "react-toastify";
import { Monitor } from "@/types/Monitor";
import MonitorCard from "./MonitorCard";
import MonitorActionRow from "./ActionRow";

/**
 * Function to create the monitors dashboard page.
 *
 * @returns {ReactElement} The monitors dashboard page
 */
export default function StatusPages() {
    // Create a monitors state
    const [monitors, setMonitors] = useState<Monitor[]>([]);

    // Get the monitors
    useEffect(() => {
        fetch("/api/monitors/getAll")
            .then((res) => res.json())
            .then((data) => {
                setMonitors(data.monitors);
            })
            .catch((err) => {
                toast.error("Failed to get monitors: ", err.message);
            });
    }, []);

    return (
        <MasterPage>
            <h1 className={"text-3xl font-semibold"}>Monitors</h1>
            <MonitorActionRow />
            <div className="flex flex-col justify-start gap-3">
                {monitors.map((monitor) => (
                    <MonitorCard key={monitor.id} monitor={monitor} />
                ))}
            </div>
        </MasterPage>
    );
}
