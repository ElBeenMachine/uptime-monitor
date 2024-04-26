/**
 * @author - @ElBeenMachine
 */

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/utils/db";

/**
 *
 * @param req The request object
 * @param res The response object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Connect to the database
    const connection = await connectToDb();

    // Query to get all monitors
    const query = `SELECT * FROM monitors;`;

    // Get all monitors from the database
    const monitors = await connection.execute(query);

    // Return the monitors
    res.status(200).json({ monitors: monitors[0] });

    // Close the connection
    connection.end();
}
