import MasterPage from "@/components/Layout/Dash/DashMaster";
import { useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status }: any = useSession();

    return (
        <MasterPage pageTitle="Home">
            <p>{JSON.stringify(session?.user, null, 4) || null}</p>
        </MasterPage>
    );
}
