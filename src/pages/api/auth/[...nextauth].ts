import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDb } from "@/utils/db";

const authOptions = {
    // Configure authentication providers
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials: any, req: any) {
                // Add database logic
                const user = {
                    firstName: "Ollie",
                    lastName: "Beenham",
                    email: "ollie@beenhamow.co.uk",
                };

                if (user) return user;
                else return null as any;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
};

export default NextAuth(authOptions);
