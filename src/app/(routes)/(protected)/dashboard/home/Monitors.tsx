"use client";

import { Monitor } from "@/types/Monitor";
import HomeCard from "./HomeCard";
import Link from "next/link";

/**
 * Function to display the status chip
 *
 * @param {string} status The status of the monitor
 */
function StatusChip(status: string) {
    let color = "bg-orange-500";
    if (status === "up") color = "bg-green-500";
    if (status === "down") color = "bg-red-500";
    return (
        <span className={`px-2 py-1 rounded-full text-white text-xs ${color}`} style={{ width: "fit-content" }}>
            {status}
        </span>
    );
}

/**
 * Function to display the monitors
 *
 * @param {Monitor[]} monitors The monitors to display
 *
 * @returns {JSX.Element} The monitors component
 */
export default function Monitors({ monitors }: { monitors: Monitor[] }) {
    function StatusChip({ status }: { status: string }) {
        let color = "bg-orange-500";
        if (status === "up") color = "bg-green-500";
        if (status === "down") color = "bg-red-500";
        return (
            <div className="flex items-center justify-end">
                <p className={`px-2 py-1 rounded-full text-white text-xs ${color} font-bold block w-20 text-center uppercase col-auto`}>{status}</p>
            </div>
        );
    }

    // Get the first 10 monitors
    monitors = monitors.slice(0, 10);

    return (
        <HomeCard title="Monitors" width={"half"}>
            <div className="w-full flex flex-col gap-3 h-full">
                {monitors.map((monitor) => (
                    <div key={monitor.id} className="grid grid-cols-5 auto-cols-max">
                        <p className={"text-lg col-span-4 md:col-span-2 text-left"}>{monitor.name}</p>
                        <p className={"text-sm col-span-2 hidden md:block text-left"}>{monitor.address}</p>

                        <StatusChip status={monitor.status} />
                    </div>
                ))}
                <div className={"flex-grow"}></div>
                <Link href="/dashboard/monitors" className="mt-3 px-2 py-1 rounded-md hover:bg-[var(--background-hover)] transition-all">
                    View More...
                </Link>
            </div>
        </HomeCard>
    );
}
