import { getConnection } from "@/lib/db/connection";
import { User } from "@/types/User";

/**
 *
 * @param {string} email The email of the user to fetch
 * @returns {User | null} The user object or null if the user does not exist
 */
export async function getUser(email: string) {
    const db = getConnection();
    const user = db.prepare(`SELECT * FROM users WHERE email='${email}' LIMIT 1`).get() as User;

    // Close the connection
    db.close();

    return user;
}
