import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3";
import { User } from "@/types/User";
import { DB_PATH } from "../db/initialise";

// TODO: Migrate LuciaAuth to use Sqlite3, preferable through a custom adapter
const db = sqlite(DB_PATH);

// Create a new Mysql2Adapter instance
const adapter = new BetterSqlite3Adapter(db, {
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
