import React from "react";

interface HomeCardProps {
    title: string;
    width?: "full" | "half" | "quarter";
    children: React.ReactNode;
}

/**
 *
 * @param {HomeCardProps} props The props for the home card
 * @returns {ReactElement} The home card
 */
function HomeCard({ title, width = "full", children }: HomeCardProps) {
    let widthClass;

    switch (width) {
        case "full":
            widthClass = "w-full";
            break;
        case "half":
            widthClass = "w-full lg:w-[calc((100%/2)-8px)]";
            break;
        case "quarter":
            widthClass = "w-full lg:w-[calc((100%/2)-8px)] xl:w-[calc((100%/4)-12px)]";
            break;
    }

    return (
        <div className={`bg-[var(--background-alt)] shadow-lg rounded-lg p-4 ${widthClass} select-none flex flex-col`}>
            <h2 className="text-xl font-semibold w-full mb-4">{title}</h2>
            <div className={"flex flex-col flex-grow"}>{children}</div>
        </div>
    );
}

export default HomeCard;
