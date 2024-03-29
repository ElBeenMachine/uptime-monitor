import MasterPage from "@/components/Layout/master";
import AuthInput from "@/components/auth/authInput";
import { useEffect, useRef } from "react";

interface LoginPageProps {}

function LoginPage({}: LoginPageProps) {
    // Create refs for the email and password inputs
    const emailRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const passwordRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);

    // Focus on the email input when the page loads
    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    return (
        <MasterPage pageTitle="Login">
            <div id="auth-container" className="w-full h-[100dvh]">
                <div className="flex flex-col items-center justify-center w-full h-full bg-[rgba(var(--background-rgb))]/40">
                    <div className="bg-[rgb(var(--background-rgb))] text-[rgb(var(--foreground-rgb))] p-6 px-8 w-full h-full flex items-center justify-center sm:block sm:rounded-md sm:w-max sm:h-max sm:shadow-lg">
                        <div className="sm:w-[300px] max-w-full">
                            <h1 className="text-2xl mb-5 mt-2">Log In</h1>

                            <AuthInput type="email" placeholder="Email" required={true} ref={emailRef} />
                            <AuthInput type="password" placeholder="Password" required={true} ref={passwordRef} />

                            <div className="w-full border-t border-solid border-[rgba(var(--foreground-rgb))]/40 my-2"></div>

                            <button className="w-full text-center px-4 py-3 my-2 bg-primary hover:bg-primary-hover font-semibold transition-all text-white rounded-md">Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </MasterPage>
    );
}

export default LoginPage;
