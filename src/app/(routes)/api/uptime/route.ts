import process from "process";
export const dynamic = "force-dynamic";

/**
 * Function to get the system uptime.
 *
 * @param {Request} req - The request object
 */
export function GET(req: Request) {
    return Response.json({
        uptime: process.uptime(),
    });
}
