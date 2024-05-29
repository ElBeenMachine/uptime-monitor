import { getConnection } from "@/lib/db/connection";
import { hashPassword } from "@/lib/pass";
import { User } from "@/types/User";

export const dynamic = "force-dynamic";

/**
 * Function to onboard a user
 *
 * @param {Request} req - The request object
 */
export async function POST(req: Request) {
    // Get the body of the request
    const body = await req.json();

    // Create a database connection
    const db = getConnection();

    // Check to see if there are already users
    if (db.prepare("select * from users").get()) return Response.json({ message: "Onboarding has already been completed" }, { status: 400 });

    try {
        // Create the user
        const user = {
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password: await hashPassword(body.password),
            email: body.email,
        } as User;

        // Insert the user into the database
        db.prepare("insert into users (firstName, lastName, username, password, email) values (?, ?, ?, ?, ?)").run(
            user.firstName,
            user.lastName,
            user.username,
            user.password,
            user.email
        );
    } catch (error) {
        return Response.json({ message: error }, { status: 500 });
    }

    return Response.json({ message: "Onboarding completed successfully" });
}
