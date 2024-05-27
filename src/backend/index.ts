// Create a database connection
import { getConnection } from "@/lib/db/connection";
import { pingHttp, pingHttps } from "./checks/http(s)";
import responseInterface from "./checks/responseInterface";
import { Monitor } from "@/types/Monitor";

// Create an empty monitors array
let monitors: Monitor[] = [];
let activeMonitors: any = {};

/**
 * Ping the monitor and update the history
 *
 * @param {monitor} _id The ID of the monitor to ping
 */
export async function pingMonitor(monitor: Monitor) {
    // Create a database connection
    const connection = getConnection();

    let oldStatus = monitor.status;
    let response: responseInterface;

    // Get the current time
    const startTime = new Date().getTime();

    // Log the start of the request
    console.log(`🟡 | Pinging monitor: ${monitor.name}`);

    // Determine the flow based on the protocol
    switch (monitor.protocol) {
        case "http":
            response = await pingHttp(monitor.address, monitor.port, monitor.timeout);
            break;

        case "https":
            response = await pingHttps(monitor.address, monitor.port, monitor.timeout);
            break;

        default:
            throw new Error(`🔴 | Protocol ${monitor.protocol} not supported`);
    }

    // Get the time after the request
    const endTime = new Date().getTime();

    // Calculate the response time in ms
    const responseTime = endTime - startTime;

    // Update the history and the state of the monitor
    const historyQuery = connection.prepare(`INSERT INTO monitor_results (monitor_id, status, responseTime) VALUES (?, ?, ?);`);
    historyQuery.run(monitor.id, response.status, responseTime);

    // If the status has changed, log it
    if (oldStatus !== response.status) {
        console.log(`🔵 | ${monitor.name} status changed to ${response.status}`);

        // Update the monitor status
        const updateQuery = connection.prepare(`UPDATE monitors SET status = ? WHERE id = ?;`);
        updateQuery.run(response.status, monitor.id);
        monitor.status = response.status;
    }

    // Close the connection
    connection.close();
}

/**
 * Update the monitors array
 */
export async function updateMonitors() {
    // Create a database connection
    const connection = getConnection();

    // Get all the monitors
    const newMonitors = connection.prepare("SELECT * FROM monitors;").all() as Monitor[];

    // If there are any monitors in the new array that are not in the old one, add them
    for (const monitor of newMonitors) {
        if (!monitors.find((m: Monitor) => m.id === monitor.id)) {
            // Add the monitor to the array
            monitors.push(monitor);

            // Start the monitor
            startMonitor(monitor);

            // Ping the monitor
            pingMonitor(monitor);
        }
    }

    // If there are any monitors in the old array that are not in the new one, remove them and stop the interval with the corresponding ID
    for (const monitor of monitors) {
        if (!newMonitors.find((m: Monitor) => m.id === monitor.id)) {
            // Remove the monitor from the array
            monitors = monitors.filter((m) => m.id !== monitor.id);

            // Stop the monitor
            stopMonitor(monitor);
        }
    }

    // Update the monitors array
    monitors = newMonitors;

    // Close the connection
    connection.close();
}

/**
 * Stop a monitor
 *
 * @param {Monitor} monitor The monitor to stop
 */
export async function stopMonitor(monitor: Monitor) {
    // Get the interval matching the monitor ID
    clearInterval(activeMonitors[monitor.id]);

    // Log the success
    console.log(`🔴 | Stopped monitor: ${monitor.name}`);
}

/**
 * Start a monitor
 *
 * @param {Monitor} monitor The monitor to start
 */
export async function startMonitor(monitor: Monitor) {
    activeMonitors[monitor.id] = setInterval(() => {
        pingMonitor(monitor);
    }, monitor.requestInterval * 1000);

    // Log the success
    console.log(`🟢 | Started monitor: ${monitor.name}`);
}

/**
 * Main method
 */
(async () => {
    await updateMonitors();

    // Set an interval to update the monitors every 1 minute
    setInterval(updateMonitors, 1000 * 60 * 1);
})();
