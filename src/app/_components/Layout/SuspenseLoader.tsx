import MasterPage from "./BasicMaster";

/**
 * SuspenseLoader component
 *
 * @returns {JSX.Element} The loader for suspense fallback
 */
export default function SuspenseLoader() {
    return (
        <MasterPage>
            <div className="flex items-center justify-center h-[100dvh] w-full">
                <div className="text-2xl font-semibold">Loading Dashboard</div>
            </div>
        </MasterPage>
    );
}
