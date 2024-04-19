import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDb } from "@/utils/db";
import bcrypt from "bcrypt";

const authOptions = {
    session: {
        jwt: true,
    },
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
    callbacks: {
        async jwt({ token, user, trigger, session }: any) {
            if (trigger == "update" && session?.user) {
                token.user = {
                    ...token.user,
                    ...session.user,
                };
                return token;
            }

            if (user) {
                // Set the token to the user minus the password field
                token.user = user;
                delete token.user.password;
            }

            return token;
        },

        session: async ({ session, token }: any) => {
            if (token != undefined) {
                session.user = token.user;
            }

            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
};

export default NextAuth(authOptions as any);
