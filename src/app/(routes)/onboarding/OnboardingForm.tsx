"use client";

import { useState } from "react";
import WelcomePage from "./Welcome";
import OnboardingData from "./OnboardingData";
import UsernamePassword from "./UsernamePassword";
import PersonalInfo from "./PersonalInfo";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function OnboardingForm() {
    const [page, setPage] = useState(0);
    const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", username: "", password: "", confirmPassword: "" });

    const [data, setData] = useState<OnboardingData>({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    function validate(name: string, value: string) {
        let errorMessage = "";

        switch (name) {
            case "firstName":
                if (value.length < 3 || value.length > 20) {
                    errorMessage = "First name must be between 3 and 20 characters long";
                }
                break;

            case "lastName":
                if (value.length < 3 || value.length > 20) {
                    errorMessage = "Last name must be between 3 and 20 characters long";
                }
                break;

            case "email":
                const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+$/g;
                if (!emailRegex.test(value)) {
                    errorMessage = "Invalid email address";
                }
                break;

            case "username":
                if (value.length < 3 || value.length > 20) {
                    errorMessage = "Username must be between 3 and 20 characters long";
                }
                break;

            case "password":
                const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}/g;
                if (!passwordRegex.test(value)) {
                    errorMessage =
                        "Password must be at least 8 characters long, and must contain at least 1 number, 1 uppercase character, and 1 special character";
                }
                break;

            case "confirmPassword":
                if (value !== data.password) {
                    errorMessage = "Passwords do not match";
                }
                break;
        }

        setErrors({ ...errors, [name]: errorMessage });
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        validate(name, value);
        setData({
            ...data,
            [name]: value,
        });
    };

    const pages = [
        <WelcomePage />,
        <PersonalInfo errors={errors} data={data} handleChange={handleChange} />,
        <UsernamePassword errors={errors} data={data} handleChange={handleChange} />,
    ];

    // Create the user
    async function createUser() {
        // Ensure there are no errors
        if (Object.values(errors).some((error) => error !== "")) {
            toast.error("You have some errors in your form. Please fix them before continuing.");
            return;
        }

        const response = await fetch("/api/onboarding/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const body = await response.json();

        if (response.ok) {
            console.log(body.message);
            redirect("/dashboard");
        } else {
            toast.error(body.messsage);
        }
    }

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

                {page === pages.length - 1 ? (
                    <button
                        className="px-4 py-2 rounded-md bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white transition-all"
                        onClick={createUser}
                    >
                        Finish
                    </button>
                ) : null}
            </div>
        </div>
    );
}
