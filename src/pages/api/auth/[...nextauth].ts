import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDb } from "@/utils/db";
import bcrypt from "bcrypt";

const authOptions = {
    secret: process.env.AUTH_SECRET,
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
                // Create database connection
                const connection = await connectToDb();

                // Get email and password from request
                const { email, password } = credentials;

                // Check if user exists in the database
                const query = `SELECT * FROM users WHERE email = "${email}" LIMIT 1;`;
                const user = (await connection.execute(query))[0][0];

                // If no user was found, return null
                if (!user) return null;

                // Bcrypt compare
                const match = await bcrypt.compare(password, user.password);
                if (!match) return null;

                // Return the user object if everything is correct
                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
};

export default NextAuth(authOptions);
