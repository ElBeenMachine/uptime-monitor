"use client";

import { useState } from "react";
import WelcomePage from "./Welcome";
import OnboardingData from "./OnboardingData";
import UsernamePassword from "./UsernamePassword";

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

    const pages = [<WelcomePage />, <UsernamePassword data={data} handleChange={handleChange} />];

    return (
        <div className={"h-auto w-[500px] max-w-full bg-[var(--background-alt)] p-5 rounded-md shadow-md"}>
            {pages[page]}
            <div>
                <button
                    onClick={() => {
                        setPage((oldPage) => oldPage + 1);
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
