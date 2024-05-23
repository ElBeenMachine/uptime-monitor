"use client";

import { getGravatar } from "@/lib/gravatar";
import MasterPage from "../DashMaster";
import { ReactNode, useRef, Ref, forwardRef, useEffect, useState } from "react";
import { User } from "lucia";
import getSession from "@/lib/getSession";
import { logout } from "./logout";

interface FormContainerProps {
    children?: ReactNode;
}

/**
 * Function to create a form container.
 *
 * @param {ReactNode} children The children of the form container
 *
 * @returns {ReactElement} The form container
 */
function FormContainer({ children }: FormContainerProps) {
    return <div className={"flex flex-col first-of-type:mt-0 mt-3"}>{children}</div>;
}

/**
 * Function to create a form input.
 *
 * @returns {ReactElement} The form input
 */
const FormInput = forwardRef((props: { name: string }, ref: Ref<HTMLInputElement>) => {
    return (
        <div className={"flex flex-col gap-2 first-of-type:mt-0 mt-3"}>
            <label htmlFor={props.name} className={"text-sm"}>
                {props.name}
            </label>
            <input ref={ref} name={props.name} className={"bg-[var(--background-alt)] px-4 py-2 rounded-md focus:outline-[var(--foreground)] focus:outline-1 focus:outline transition-all"} />
        </div>
    );
});

/**
 * Function to create the profile page.
 *
 * @returns {ReactElements} The profile page
 */
export default function Profile() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const fNameRef = useRef<HTMLInputElement>(null);
    const lNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getSession().then(({ user }) => {
            if (fNameRef.current && lNameRef.current && emailRef.current && usernameRef.current) {
                fNameRef.current.value = user?.firstName ?? "";
                lNameRef.current.value = user?.lastName ?? "";
                emailRef.current.value = user?.email ?? "";
                usernameRef.current.value = user?.username ?? "";
            }
            return setUser(user);
        });
    }, []);

    return (
        <MasterPage>
            <h1 className={"text-3xl font-semibold"}>Profile</h1>
            <div className={"flex gap-4 mt-4 flex-col-reverse lg:flex-row"}>
                <div className={"w-full"}>
                    <h2 className={"text-2xl font-semibold border-b border-solid border-[var(--background-alt)] mb-2 pb-2"}>Account Information</h2>

                    <FormContainer>
                        <FormInput name={"First Name"} ref={fNameRef} />
                        <FormInput name={"Last Name"} ref={lNameRef} />
                    </FormContainer>

                    <FormContainer>
                        <FormInput name={"Email Address"} ref={emailRef} />
                        <FormInput name={"Username"} ref={usernameRef} />
                    </FormContainer>

                    <h2 className={"text-2xl font-semibold border-b border-solid border-[var(--background-alt)] mb-2 mt-5 pb-2"}>Sign Out</h2>
                    <button
                        onClick={() => {
                            logout();
                        }}
                        className={"rounded-md px-4 py-2 mt-1 bg-[var(--accent-primary)] transition-all text-white hover:bg-[var(--accent-primary-hover)]"}
                    >
                        Sign Out
                    </button>
                </div>
                <div className={"flex items-center flex-col"}>
                    <img src={getGravatar(user?.email ?? "", { size: 2048 })} alt={user?.username ?? ""} className={"rounded-full w-52 h-52 "} />

                    <p className={"text-gray-500 my-3 text-center"}>
                        <em>
                            Our profile pictures are powered by the third party{" "}
                            <a href="https://gravatar.com/" target="_blank" className={"underline"}>
                                Gravatar
                            </a>
                            . If you would like to change your profile picture, please visit{" "}
                            <a href="https://gravatar.com/profile/avatars" target="_blank" className={"underline"}>
                                this link.
                            </a>
                        </em>
                    </p>
                    <a
                        href={"https://gravatar.com/profile/avatars"}
                        target={"_blank"}
                        className={"cursor-pointer block w-max rounded-md px-4 py-2 mt-1 bg-[var(--accent-primary)] transition-all text-white hover:bg-[var(--accent-primary-hover)]"}
                    >
                        Update Profile Picture
                    </a>
                    <div className={"mt-4"}></div>
                </div>
            </div>
        </MasterPage>
    );
}
