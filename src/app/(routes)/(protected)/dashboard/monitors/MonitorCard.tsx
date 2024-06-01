import StatusChip from "@/app/_components/Monitors/StatusChip";
import { Monitor } from "@/types/Monitor";
import Link from "next/link";

interface MonitorProps {
    monitor: Monitor;
}

export default function MonitorCard({ monitor }: MonitorProps) {
    return (
        <Link
            href={`/dashboard/monitor/${monitor.id}`}
            className="flex items-center bg-[var(--background-alt)] px-5 py-3 rounded-md hover:bg-[var(--background-alt-hover)] transition-all cursor-pointer "
        >
            <div className="flex flex-col justify-center">
                <p className={"text-lg col-span-3 text-left"}>{monitor.name}</p>
                <p className={"text-sm col-span-1 hidden md:block text-left"}>{monitor.address}</p>
            </div>

            <div className="flex-grow"></div>
            <StatusChip status={monitor.status} />
        </Link>
    );
}
