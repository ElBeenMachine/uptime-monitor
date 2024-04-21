/**
 * @author - @ElBeenMachine
 */

import MasterPage from "@/components/Layout/Dash/DashMaster";
import { signOut, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useRef, Ref, forwardRef } from "react";

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
    const { data: session } = useSession();

    const fNameRef = useRef(null);
    const lNameRef = useRef(null);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);

    useEffect(() => {
        if (session) {
            // @ts-ignore
            fNameRef.current.value = session.user.firstName;
            // @ts-ignore
            lNameRef.current.value = session.user.lastName;
            // @ts-ignore
            emailRef.current.value = session.user.email;
            // @ts-ignore
            usernameRef.current.value = session.user.username;
        }
    }, [session]);

    return (
        <MasterPage pageTitle="My Profile">
            <h1 className={"text-3xl font-semibold"}>Profile</h1>
            <div className={"flex gap-4 mt-4 flex-col lg:flex-row"}>
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
                    <button onClick={() => signOut()} className={"rounded-md px-4 py-2 mt-1 bg-[var(--accent-primary)] transition-all text-white hover:bg-[var(--accent-primary-hover)]"}>
                        Sign Out
                    </button>
                </div>
                <div className={"w-full"}>
                    <h2 className={"text-2xl font-semibold border-b border-solid border-[var(--background-alt)] mb-2 pb-2"}>Account Information</h2>
                    <p className={"text-gray-500"}>Below is the information we have on file for your account. If you need to change any of this information, please contact support.</p>
                    <div className={"mt-4"}></div>
                </div>
            </div>
        </MasterPage>
    );
}
