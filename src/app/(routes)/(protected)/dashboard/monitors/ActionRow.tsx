import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

function ActionButton() {}

/**
 * The action button row component for the monitors page
 *
 * @returns {JSX.Element} The monitor action row
 */
export default function MonitorActionRow() {
    return (
        <div className="flex gap-3 items-center py-3">
            <Link
                href="/dashboard/monitors/create"
                className="py-2 px-4 bg-[var(--accent-primary)] rounded-full flex items-center font-semibold hover:bg-[var(--accent-primary-hover)] transition-all"
            >
                <IoMdAdd className="inline-block mr-1" /> Create Monitor
            </Link>
        </div>
    );
}
