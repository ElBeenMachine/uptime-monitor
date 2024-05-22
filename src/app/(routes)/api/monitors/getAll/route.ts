import { connectToDb } from "@/global_utils/db";

/**
 *
 * @param {Request} req The request object
 */
export async function GET(req: Request) {
    // Connect to the database
    const connection = await connectToDb();

    // Query to get all monitors
    const query = `SELECT * FROM monitors;`;

    // Get all monitors from the database
    const monitors = await connection.execute(query);

    // Close the connection
    connection.end();

    // Return the monitors
    return Response.json({ monitors: monitors[0] });
}
