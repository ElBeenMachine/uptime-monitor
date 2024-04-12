import { useState } from "react";

interface DashNavProps {}

function DashNav({}: DashNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    return <nav className={"w-60 h-[100dvh]"}></nav>;
}

export default DashNav;
