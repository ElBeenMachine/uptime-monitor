import MasterPage from "@/components/Layout/Dash/DashMaster";
import { signOut, useSession } from "next-auth/react";

export default function DashboardHome() {
    return (
        <MasterPage pageTitle="My Profile">
            {/* Button to log out of the session */}
            <button onClick={() => signOut()} className={"underline"}>
                Sign Out
            </button>
        </MasterPage>
    );
}
