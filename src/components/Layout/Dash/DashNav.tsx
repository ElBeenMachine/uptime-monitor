import { useSession } from "next-auth/react";
import { useState } from "react";

interface DashNavProps {}

function UserCard() {
    // Get user from session
    const { data: session, status }: any = useSession();

    return (
        <div id={"nav-user-card"} className={"rounded-md bg-[rgb(var(--background-rgb))] hover:bg-[rgb(var(--background-rgb-hover))] p-3 shadow-md w-full transition-all cursor-pointer"}>
            {JSON.stringify(session?.user.firstName)}
        </div>
    );
}

function DashNav({}: DashNavProps) {
    return (
        <nav className={"md:w-full md:max-w-60 h-[100dvh] bg-[rgb(var(--background-alt-rgb))] shadow-md"}>
            <div></div>
            <div className={"flex flex-col items-center justify-start w-full h-full p-3"}>
                <div className={"flex-grow"}></div>
                <UserCard />
            </div>
        </nav>
    );
}

export default DashNav;
