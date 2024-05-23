import { Lucia } from "lucia";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";
import mysql from "mysql2/promise";
import { User } from "@/types/User";

// Define connection parameters
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

// Create a database connection pool
const connection = mysql.createPool({
    host,
    user,
    password,
    database,
});

// Create a new Mysql2Adapter instance
const adapter = new Mysql2Adapter(connection, {
    user: "users",
    session: "sessions",
});

// Create a new Lucia instance
export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            firstName: attributes.firstName,
            lastName: attributes.lastName,
            email: attributes.email,
            username: attributes.username,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: User;
    }
}
