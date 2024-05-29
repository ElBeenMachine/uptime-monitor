import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { Suspense } from "react";
import SuspenseLoader from "@/app/_components/Layout/SuspenseLoader";

export default async function AuthenticatedLayout({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    const { session } = await getSession();

    if (!session) {
        redirect("/auth/login");
    }

    return <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>;
}
