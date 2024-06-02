import getSession from "@/lib/auth/getSession";
import { getConnection } from "@/lib/db/connection";
import { Monitor } from "@/types/Monitor";
export const dynamic = "force-dynamic";

/**
 *
 * @param {Request} req The request object
 */
export async function GET(req: Request) {
    // Check authentication
    const { session } = await getSession();
    if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

    // Connect to the database
    const db = getConnection();

    // Query to get all monitors
    const monitors = db.prepare(`SELECT * FROM monitors;`).all() as Monitor[];

    // Close the connection
    db.close();

    // Return the monitors
    return Response.json({ monitors });
}
