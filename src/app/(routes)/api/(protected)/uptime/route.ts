import getSession from "@/lib/auth/getSession";
import process from "process";
export const dynamic = "force-dynamic";

/**
 * Function to get the system uptime.
 *
 * @param {Request} req - The request object
 */
export async function GET(req: Request) {
    // Check authentication
    const { session } = await getSession();
    if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

    return Response.json({
        uptime: process.uptime(),
    });
}
