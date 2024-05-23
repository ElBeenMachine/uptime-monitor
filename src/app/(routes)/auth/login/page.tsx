import "./auth.css";
import MasterPage from "@/components/Layout/BasicMaster";
import AuthInput from "@/components/Auth/authInput";
import { Suspense } from "react";
import React from "react";
import LoginError from "./LoginError";
import { redirect } from "next/navigation";
import { getUser } from "./GetUser";
import { comparePassword } from "@/lib/pass";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";

interface LoginPageProps {}

function LoginPage({}: LoginPageProps) {
    return (
        <MasterPage>
            <div id="auth-container" className="w-full h-[100dvh]">
                <div className="flex flex-col items-center justify-center w-full h-full bg-[rgba(var(--background))]/40">
                    <div className="bg-[var(--background)] text-[var(--foreground)] p-6 px-8 w-full h-full flex items-center justify-center sm:block sm:rounded-md sm:w-max sm:h-max sm:shadow-lg">
                        <form action={login} className="sm:w-[300px] max-w-full">
                            <h1 className="text-2xl mb-5 mt-2">Log In</h1>

                            <AuthInput type="email" placeholder="Email" name={"email"} required={true} />
                            <AuthInput type="password" placeholder="Password" name={"password"} required={true} />

                            <Suspense>
                                <LoginError />
                            </Suspense>

                            <div className="w-full border-t border-solid border-[rgba(var(--foreground))]/40 my-2"></div>

                            <button type="submit" className="w-full text-center px-4 py-3 my-2 bg-primary hover:bg-primary-hover font-semibold transition-all text-white rounded-md">
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </MasterPage>
    );
}

async function login(formData: FormData): Promise<void> {
    "use server";

    const email = formData.get("email") as string;

    if (!email) return redirect("/auth/login?error=Email address is required");

    const password = formData.get("password") as string;
    if (!password) return redirect("/auth/login?error=Password is required");

    // Locate the user
    const user = await getUser(email);

    // Check if the user exists, if not redirect back to the login page
    if (!user) return redirect("/auth/login?error=Username or password is incorrect");

    // Check the password against the hash
    const passwordMatch = await comparePassword(password, user.password);

    // If the password doesn't match, redirect back to the login page
    if (!passwordMatch) return redirect("/auth/login?error=Username or password is incorrect");

    // Create a session
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    // Redirect to the dashboard
    return redirect("/dashboard");
}

export default LoginPage;
