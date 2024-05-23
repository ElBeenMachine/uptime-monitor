import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

export default async function AuthenticatedLayout({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    const { session } = await getSession();

    if (!session) {
        redirect("/auth/login");
    }

    return <>{children}</>;
}
