import { getConnection } from "@/lib/db/connection";
import { MonitorHistory } from "@/types/History";
import { Monitor } from "@/types/Monitor";
import moment from "moment";
import "moment-timezone";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    // Connect to the database
    const db = getConnection();

    // Create an array of date objects for every 10 minutes in the past 6 hours
    const dates = [];
    const now = new Date();
    now.setMinutes(Math.floor(now.getMinutes() / 5) * 5, 0, 0); // Round down to nearest 5 minutes

    // Loop through the past 6 hours
    for (let i = 0; i < 72; i++) {
        const date = new Date(now.getTime() - i * 5 * 60 * 1000); // Subtract 5 minutes for each iteration
        dates.push(date);
    }

    // Reverse the dates so they are in chronological order
    dates.reverse();

    // Get all monitors
    const monitors = db.prepare("SELECT * FROM monitors;").all() as Monitor[];

    // Create an array to store the history
    const history = [];

    // Create an object to store the monitor intervals
    const monitorIntervals: any = {};
    for (const monitor of monitors) {
        monitorIntervals[monitor.id] = monitor.requestInterval;
    }

    // Loop through the dates
    for (const date of dates) {
        // Get the date object both before and after by the interval of each monitor
        const dateBefore = new Date(date);
        const dateAfter = new Date(date);

        // Create a count for up and down monitors
        let upCount = 0;
        let downCount = 0;

        // Loop through each monitor
        for (const monitor of monitors) {
            // Get the date before and after based on the monitor's interval
            dateBefore.setMinutes(dateBefore.getMinutes() - monitor.requestInterval);
            dateAfter.setMinutes(dateAfter.getMinutes() + monitor.requestInterval);

            // Get the history for the monitor within the date range
            const historyQuery = `SELECT * FROM history WHERE monitorID = "${
                monitor.id
            }" AND timestamp >= "${dateBefore.toISOString()}" AND timestamp <= "${dateAfter.toISOString()}";`;
            const history = db.prepare(historyQuery).all() as MonitorHistory[];

            // If there is no history, add a down status
            if (history.length === 0) {
                downCount++;
            } else {
                // Get the median history value
                let val = history[Math.floor(history.length / 2)];

                // If there is no history, add a down status
                if (val.status == "down") {
                    downCount++;
                } else {
                    upCount++;
                }
            }
        }

        // Add the up and down counts to the history
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        history.push({
            timestamp: moment(date).tz(timezone).format("HH:mm"),
            up: upCount,
            down: downCount,
        });
    }

    // Close the connection
    db.close();

    // Return the results
    return Response.json(history);
}
