/**
 * Function to display the status chip
 *
 * @param {string} status The status of the monitor
 *
 * @returns {JSX.Element} The status chip component
 */
export default function StatusChip({ status }: { status: string }) {
    let color = "bg-orange-500";
    if (status === "up") color = "bg-green-500";
    if (status === "down") color = "bg-red-500";
    return (
        <div className="flex items-center justify-end">
            <p className={`px-2 py-1 rounded-full text-white text-xs ${color} font-bold block w-20 text-center uppercase col-auto`}>{status}</p>
        </div>
    );
}
