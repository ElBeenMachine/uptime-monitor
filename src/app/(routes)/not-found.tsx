import React from "react";
import MasterPage from "@/components/Layout/BasicMaster";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <MasterPage>
            <div className={"w-full h-[100dvh] flex flex-col gap-3 items-center justify-center p-10"}>
                <h1 className={"font-black text-3xl"}>404 - Page Not Found</h1>

                <p>The page you are looking for does not exist.</p>

                <Link className={"underline"} href={"/"}>
                    Go back to the home page
                </Link>
            </div>
        </MasterPage>
    );
}
