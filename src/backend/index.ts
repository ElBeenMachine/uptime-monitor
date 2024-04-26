// Create a database connection
import { connectToDb } from "@/utils/db";
import { pingHttp, pingHttps } from "./checks/http(s)";
import responseInterface from "./checks/responseInterface";

// Create an empty monitors array
let monitors: any[] = [];
let activeMonitors: any = {};

/**
 * Ping the monitor and update the history
 *
 * @param _id The ID of the monitor to ping
 */
export async function pingMonitor(_id: string) {
    // Create a database connection
    const connection = await connectToDb();

    // Get the monitor from the database
    const query = `SELECT * FROM monitors WHERE id = "${_id}";`;
    const monitor = (await connection.execute(query))[0][0];

    // If the monitor is not found, return an error
    if (!monitor) {
        throw new Error(`🔴 | Monitor ${_id} not found`);
    }

    let oldStatus = monitor.status;
    let response: responseInterface;

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
    const historyQuery = `INSERT INTO history (monitorID, status, timestamp) VALUES ("${_id}", "${response.status}", "${response.timestamp}");`;
    const monitorQuery = `UPDATE monitors SET status = "${response.status}" WHERE id = "${_id}";`;

    await connection.execute(historyQuery);
    await connection.execute(monitorQuery);

    // If the status has changed, log it
    if (oldStatus !== response.status) {
        console.log(`🔵 | Monitor ${_id} status changed to ${response.status}`);
    }

    await connection.end();
}

/**
 * Update the monitors array
 */
export async function updateMonitors() {
    // Create a database connection
    const connection = await connectToDb();

    // Get all the monitors
    const query = "SELECT * FROM monitors;";
    const newMonitors = (await connection.execute(query))[0];

    // If there are any monitors in the new array that are not in the old one, add them
    for (const monitor of newMonitors) {
        if (!monitors.find((m: any) => m.id === monitor.id)) {
            // Add the monitor to the array
            monitors.push(monitor);

            // Start the monitor
            startMonitor(monitor);
        }
    }

    // If there are any monitors in the old array that are not in the new one, remove them and stop the interval with the corresponding ID
    for (const monitor of monitors) {
        if (!newMonitors.find((m: any) => m.id === monitor.id)) {
            // Remove the monitor from the array
            monitors = monitors.filter((m) => m.id !== monitor.id);

            // Stop the monitor
            stopMonitor(monitor.id);
        }
    }

    // Update the monitors array
    monitors = newMonitors;

    await connection.end();
}

/**
 * Stop a monitor
 *
 * @param _id The ID of the monitor to stop
 */
export async function stopMonitor(_id: string) {
    // Log the process
    console.log(`🟠 | Stopping monitor ${_id}`);

    // Get the interval matching the monitor ID
    clearInterval(activeMonitors[_id]);

    // Log the success
    console.log(`🟢 | Stopped monitor ${_id}`);
}

/**
 * Start a monitor
 *
 * @param monitor The monitor to start
 */
export async function startMonitor(monitor: any) {
    // Log the process
    console.log(`🟠 | Starting monitor ${monitor.id}`);

    // Create a database connection
    const connection = await connectToDb();

    // Update the monitor
    const query = `UPDATE monitors SET status = "false" WHERE id = "${monitor.id};"`;
    await connection.execute(query);

    activeMonitors[monitor.id] = setInterval(() => {
        pingMonitor(monitor.id);
    }, monitor.requestInterval * 1000);

    // Log the success
    console.log(`🟢 | Started monitor ${monitor.id}`);

    await connection.end();
}

/**
 * Reset the status of all monitors to down
 */
export async function resetMonitors() {
    // Create a database connection
    const connection = await connectToDb();

    // Update all the monitors
    const query = `UPDATE monitors SET status = "down";`;
    await connection.execute(query);
    await connection.end();
}

/**
 * Main method
 */
(async () => {
    await resetMonitors();
    await updateMonitors();

    // Set an interval to update the monitors every 1 minute
    setInterval(updateMonitors, 1000 * 60 * 1);
})();
