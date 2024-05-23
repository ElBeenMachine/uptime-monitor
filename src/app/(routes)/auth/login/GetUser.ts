import { User } from "@/types/User";
import { connectToDb } from "@/lib/db";

/**
 *
 * @param {string} email The email of the user to fetch
 * @returns {User | null} The user object or null if the user does not exist
 */
export async function getUser(email: string) {
    const connection = await connectToDb();
    const users = (await connection.execute("SELECT * FROM users WHERE email = ? LIMIT 1", [email]))[0] as User[];

    if (users.length == 0) return null;

    return users[0];
}
