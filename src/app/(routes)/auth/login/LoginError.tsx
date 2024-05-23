"use client";
import { useSearchParams } from "next/navigation";

/**
 * Function to create the login error component if an error is present.
 *
 * @returns {ReactElement} The login error component
 */
export default function LoginError() {
    // Get search params
    const searchParams = useSearchParams();

    // See if there is an error
    const error = searchParams?.get("error");

    // If there is an error, display it
    if (error) {
        return <div className="w-full bg-red-100 text-red-700 py-2 px-3 text-sm mb-2 rounded-md border border-red-300">{error || "An unexpected error has occurred when trying to log in"}</div>;
    } else {
        return null;
    }
}
