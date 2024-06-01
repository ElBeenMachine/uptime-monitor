"use client";

import { Monitor } from "@/types/Monitor";
import HomeCard from "./HomeCard";
import Link from "next/link";
import StatusChip from "@/components/Monitors/StatusChip";

/**
 * Function to display the monitors
 *
 * @param {Monitor[]} monitors The monitors to display
 *
 * @returns {JSX.Element} The monitors component
 */
export default function Monitors({ monitors }: { monitors: Monitor[] }) {
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
