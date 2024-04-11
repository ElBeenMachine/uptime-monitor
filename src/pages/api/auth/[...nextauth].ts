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
                console.log(credentials, req);

                // Create database connection
                const db = await connectToDb();

                // TODO: Get username and password from request
                // TODO: Check if user exists in the database
                // TODO: Check if password is correct
                // TODO: Return user object if everything is correct
                // TODO: Return null if user does not exist or password is incorrect

                const user = null;
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
};

export default NextAuth(authOptions);
