/**
 * @author - @ElBeenMachine
 */

import MasterPage from "@/components/Layout/Dash/DashMaster";
import { useEffect } from "react";
import { useState } from "react";

/**
 * Function to create the dashboard home page.
 *
 * @returns {ReactElement} The dashboard home page
 */
export default function DashboardHome() {
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
    return <MasterPage pageTitle="Dashboard">{monitors.length}</MasterPage>;
}
