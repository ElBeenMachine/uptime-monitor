import MasterPage from "@/components/Layout/BasicMaster";
import { getConnection } from "@/lib/db/connection";
import { redirect } from "next/navigation";

export default function Page() {
    // See if there are any users
    const connection = getConnection();
    const user = connection.prepare("SELECT * FROM users").get();
    connection.close();

    if (!user) return redirect("/onboarding");

    return <MasterPage>Loading...</MasterPage>;
}
