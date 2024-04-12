import MasterPage from "@/components/Layout/Dash/DashMaster";
import { signOut, useSession } from "next-auth/react";

export default function DashboardHome() {
    const { data: session, status }: any = useSession();

    return (
        <MasterPage pageTitle="Dashboard">
            <p>{JSON.stringify(session?.user, null, 4) || null}</p>

            {/* Button to log out of the session */}
            <button onClick={() => signOut()}>Sign Out</button>
        </MasterPage>
    );
}
