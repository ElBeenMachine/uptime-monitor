import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

export default async function AuthenticatedLayout({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    const { user } = await getSession();

    if (!user) {
        redirect("/auth/login");
    }

    return <>{children}</>;
}
