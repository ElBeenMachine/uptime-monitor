// Create a database connection
import { getConnection } from "@/lib/db/connection";
import { pingHttp, pingHttps } from "./checks/http(s)";
import { Monitor } from "@/types/Monitor";
import PingResonse from "@/types/PingResponse";

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
    let response: PingResonse;

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

    // Update the history and the state of the monitor
    const historyQuery = connection.prepare(
        `INSERT INTO monitor_results (monitor_id, status, message, responseTime, responseCode) VALUES (?, ?, ?, ?, ?);`
    );
    historyQuery.run(monitor.id, response.status, response.message, response.responseTime, response.responseCode);

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

    // If there are any monitors that are present in the new array, and the old one, but the new one is different, overwrite the entry in the old one
    for (const monitor of monitors) {
        const newMonitor = newMonitors.find((m: Monitor) => m.id === monitor.id);

        if (newMonitor) {
            if (JSON.stringify(monitor) !== JSON.stringify(newMonitor)) {
                // Stop the monitor
                stopMonitor(monitor);

                // Start the monitor
                startMonitor(newMonitor);

                // Update the monitor in the array
                monitors = monitors.map((m) => (m.id === newMonitor.id ? newMonitor : m));
            }
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

    // Set an interval to update the monitors every 30 seconds
    setInterval(await updateMonitors, 1000 * 30);
})();
