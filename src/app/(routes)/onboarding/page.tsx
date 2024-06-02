import MasterPage from "@/app/_components/Layout/BasicMaster";
import { getConnection } from "@/lib/db/connection";
import getSession from "@/lib/auth/getSession";
import { redirect } from "next/navigation";
import OnboardingForm from "./OnboardingForm";

export default async function Onboarding() {
    // Get the session
    const { session } = await getSession();

    // If there is a session active, redirect to the dashbaord
    if (session) return redirect("/dashboard");

    // See if there are any registered users, and if there are, redirect to the dashboard
    const db = getConnection();
    const user = db.prepare("SELECT * FROM users").get();
    db.close();

    if (user) return redirect("/dashboard");

    return (
        <MasterPage>
            <div className="flex flex-col items-center justify-center h-[100dvh] md:p-10">
                <OnboardingForm />
            </div>
        </MasterPage>
    );
}
