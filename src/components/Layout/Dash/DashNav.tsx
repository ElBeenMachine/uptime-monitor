import { getGravatar } from "@/utils/gravatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Link from "next/link";

interface DashNavProps {}

/**
 * Function to create a user card.
 * @returns {ReactElement} The user card
 */
function UserCard() {
    // Get user from session
    const { data: session, status }: any = useSession();

    return (
        <Link
            id={"nav-user-card"}
            className={"rounded-md bg-[rgb(var(--background-rgb))] hover:bg-[rgb(var(--background-rgb-hover))] p-3 shadow-md w-full transition-all cursor-pointer flex justify-between items-center"}
            href={"/dashboard/profile"}
        >
            <img src={getGravatar(session?.user.email, { size: 50 })} alt={session?.user.fname} className={"rounded-full w-6 h-6"} />
            {session?.user.firstName} {session?.user.lastName}
        </Link>
    );
}

interface NavLinkInterface {
    href: string;
    text: string;
    icon?: ReactElement;
}

/**
 * Function to create a navigation link.
 *
 * @param {NavLinkInterface} props The props for the navigation link
 *
 * @returns {ReactElement} The navigation link
 */
function NavLink({ href, text, icon }: NavLinkInterface) {
    // If the current path matches the path of the link, add the active class
    const router = useRouter();
    const activeClass = router.pathname === href ? "bg-[rgb(var(--background-rgb))] shadow-md" : "";

    return (
        <Link
            id={"nav-user-card"}
            className={`rounded-md hover:bg-[rgb(var(--background-rgb-hover))] p-3 w-full transition-all cursor-pointer flex justify-start items-center ${activeClass}`}
            href={href}
        >
            {icon ? <span className={"mr-2"}>{icon}</span> : null}
            {text}
        </Link>
    );
}

function DashNav({}: DashNavProps) {
    return (
        <nav className={"md:w-full md:max-w-60 h-[100dvh] bg-[rgb(var(--background-alt-rgb))] shadow-md"}>
            <div className={"flex flex-col items-center justify-start w-full h-full p-3"}>
                {/* Navigation Branding */}
                <div></div>

                {/* Navigation Links */}
                <div className={"flex-grow w-full flex flex-col gap-2"}>
                    <NavLink href={"/dashboard"} text={"Home"} icon={<MdOutlineDashboard />} />
                    <NavLink href={"/dashboard/pages"} text={"Status Pages"} icon={<CgWebsite />} />
                </div>

                {/* Navigation User Card */}
                <UserCard />
            </div>
        </nav>
    );
}

export default DashNav;
