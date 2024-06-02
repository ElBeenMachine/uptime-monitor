import getSession from "@/lib/auth/getSession";
import { getConnection } from "@/lib/db/connection";
import { Monitor } from "@/types/Monitor";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

/**
 * API Route to get the information and result history for one monitor
 *
 * @param {Request} req The request object
 */
export async function GET(req: NextRequest) {
    // Check authentication
    const { session } = await getSession();
    if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

    // Get the history limit and monitor id from the request
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const monitorId = searchParams.get("id");

    // If no ID is provided, return a 400 error
    if (!monitorId) {
        return Response.json({ message: "Monitor ID is required" }, { status: 400 });
    }

    // Connect to the database
    const db = getConnection();

    // Query to get the monitor
    const monitor = db.prepare(`SELECT * FROM monitors WHERE id = ?;`).get(monitorId) as Monitor;

    // If no monitor is found, return a 404 error
    if (!monitor) {
        return Response.json({ message: "Monitor not found" }, { status: 404 });
    }

    // Get the history of the monitor
    const history = db.prepare(`SELECT * FROM monitor_results WHERE monitor_id = ? ORDER BY timestamp LIMIT ?;`).all(monitor.id, limit);

    // Close the connection
    db.close();

    // Return the monitors
    return Response.json({ monitor, history });
}
