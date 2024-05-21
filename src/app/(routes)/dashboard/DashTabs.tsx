/**
 * @author - @ElBeenMachine
 */

import React from "react";
import { getGravatar } from "@/utils/gravatar";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Link from "next/link";

interface NavLinkInterface {
    href: string;
    children: any;
}

/**
 * Function to create a navigation link.
 *
 * @param {NavLinkInterface} props The props for the navigation link
 *
 * @returns {ReactElement} The navigation link
 */
function NavLink({ href, children }: NavLinkInterface) {
    // If the current path matches the path of the link, add the active class
    const pathname = usePathname();
    const activeClass = pathname === href ? "bg-[var(--background)] shadow-md" : "";

    return (
        <Link id={"nav-user-card"} className={`rounded-md hover:bg-[var(--background-hover)] p-3 w-full transition-all cursor-pointer flex justify-center items-center ${activeClass}`} href={href}>
            {children}
        </Link>
    );
}

interface DashTabsProps {}

/**
 *
 * @param {DashTabsProps} props Navigation properties
 * @returns {ReactElement} The dashboard navigation
 */
export default function DashTabs({}: DashTabsProps) {
    // TODO: Get user from session

    return (
        <>
            <div className={"flex-grow md:hidden"}></div>
            <nav className={"w-full h-max bg-[var(--background-alt)] shadow-md md:hidden border-t border-solid border-[var(--background-hover)]"}>
                <div className={"flex flex-col items-center justify-start w-full h-full p-4"}>
                    <div className={"w-full flex flex-row gap-2 justify-between"}>
                        <NavLink href={"/dashboard/home"}>
                            <MdOutlineDashboard size={20} />
                        </NavLink>
                        <NavLink href={"/dashboard/pages"}>
                            <CgWebsite size={20} />
                        </NavLink>
                        <NavLink href={"/dashboard/profile"}>
                            <img src={getGravatar("", { size: 50 })} alt={""} className={"rounded-full w-7 h-7"} />
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    );
}
