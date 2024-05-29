"use client";

import { useState } from "react";
import WelcomePage from "./Welcome";
import OnboardingData from "./OnboardingData";
import UsernamePassword from "./UsernamePassword";
import PersonalInfo from "./PersonalInfo";

export default function OnboardingForm() {
    const [page, setPage] = useState(0);

    const [data, setData] = useState<OnboardingData>({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const pages = [
        <WelcomePage />,
        <PersonalInfo data={data} handleChange={handleChange} />,
        <UsernamePassword data={data} handleChange={handleChange} />,
    ];

    return (
        <div
            className={
                "select-none h-full flex flex-col justify-center items-center md:h-auto w-[500px] max-w-full bg-[var(--background-alt)] p-5 md:rounded-lg shadow-md transition-all"
            }
        >
            {pages[page]}
            <div className="w-full flex justify-between items-center mt-10 mb-5 px-8 select-none">
                {page > 0 ? (
                    <button
                        className="px-4 py-2 rounded-md bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white transition-all"
                        onClick={() => {
                            setPage((oldPage) => oldPage - 1);
                        }}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                ) : null}

                <div className={"flex-grow"}></div>

                {page === pages.length - 1 ? null : (
                    <button
                        className="px-4 py-2 rounded-md bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white transition-all"
                        onClick={() => {
                            setPage((oldPage) => oldPage + 1);
                        }}
                        disabled={page === pages.length - 1}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}
