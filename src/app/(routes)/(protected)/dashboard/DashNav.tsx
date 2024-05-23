"use client";

import { getGravatar } from "@/lib/gravatar";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Link from "next/link";
import React from "react";
import getSession from "@/lib/getSession";
import { User } from "lucia";

/**
 * Function to create a user card.
 * @returns {ReactElement} The user card
 */
function UserCard() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getSession().then(({ user }) => {
            return setUser(user);
        });
    }, []);

    return (
        <Link
            id={"nav-user-card"}
            className={"rounded-md bg-[var(--background)] hover:bg-[var(--background-hover)] p-3 shadow-md w-full transition-all cursor-pointer flex justify-start items-center"}
            href={"/dashboard/profile"}
        >
            <img src={getGravatar(user?.email ?? "", { size: 50 })} alt={user?.username ?? ""} className={"rounded-full w-6 h-6 mr-4"} />
            {user?.username}
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
    const pathname = usePathname();
    const activeClass = pathname === href ? "bg-[var(--background)] shadow-md" : "";

    return (
        <Link id={"nav-user-card"} className={`rounded-md hover:bg-[var(--background-hover)] p-3 w-full transition-all cursor-pointer flex justify-start items-center ${activeClass}`} href={href}>
            {icon ? <span className={"mr-4"}>{icon}</span> : null}
            {text}
        </Link>
    );
}

interface DashNavProps {}

/**
 *
 * @param {DashNavProps} props Navigation properties
 * @returns {ReactElement} The dashboard navigation
 */
function DashNav({}: DashNavProps) {
    return (
        <nav className={"hidden md:block md:w-full md:max-w-60 h-[100dvh] bg-[var(--background-alt)] shadow-md"}>
            <div className={"flex flex-col items-center justify-start w-full h-full p-3"}>
                {/* Navigation Branding */}
                <div></div>

                {/* Navigation Links */}
                <div className={"flex-grow w-full flex flex-col gap-2"}>
                    <NavLink href={"/dashboard/home"} text={"Home"} icon={<MdOutlineDashboard />} />
                    <NavLink href={"/dashboard/status-pages"} text={"Status Pages"} icon={<CgWebsite />} />
                </div>

                {/* Navigation User Card */}
                <UserCard />
            </div>
        </nav>
    );
}

export default DashNav;
