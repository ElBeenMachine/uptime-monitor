import MasterPage from "@/components/Layout/master";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status }: any = useSession();

    return (
        <MasterPage pageTitle="Dashboard">
            <p>{JSON.stringify(session?.user, null, 4) || null}</p>

            {/* Button to log out of the session */}
            <button onClick={() => signOut()}>Sign Out</button>
        </MasterPage>
    );
}
