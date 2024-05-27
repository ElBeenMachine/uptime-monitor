import PingResonse from "@/types/PingResponse";

/**
 * Function to ping a http address
 *
 * @param {string} address The address to ping
 * @param {number} port The port to ping
 * @param {number} timeout The timeout for the ping
 *
 * @returns {Promise<PingResonse>} The response from the ping
 */
export async function pingHttp(address: string, port: number, timeout: number = 10) {
    // Get the start time
    const startTime = Date.now();

    return new Promise<PingResonse>((resolve, reject) => {
        // Ping the monitor
        fetch(`http://${address}:${port}`, { signal: AbortSignal.timeout(timeout * 1000) })
            .then((res) => {
                // Get the end time
                const endTime = Date.now();

                resolve({
                    status: res.ok ? "up" : "down",
                    message: res.statusText,
                    responseTime: endTime - startTime,
                    responseCode: res.status,
                });
            })
            .catch((error) => {
                // Get the end time
                const endTime = Date.now();

                resolve({
                    status: "down",
                    message: error.message,
                    responseTime: endTime - startTime,
                    responseCode: 500,
                });
            });
    });
}

/**
 * Function to ping a https address
 *
 * @param {string} address The address to ping
 * @param {number} port The port to ping
 * @param {number} timeout The timeout for the ping
 *
 * @returns {Promise<PingResonse>} The response from the ping
 */
export async function pingHttps(address: string, port: number, timeout: number = 10) {
    // Get the start time
    const startTime = Date.now();

    return new Promise<PingResonse>((resolve, reject) => {
        // Ping the monitor
        fetch(`https://${address}:${port}`, { signal: AbortSignal.timeout(timeout * 1000) })
            .then((res) => {
                // Get the end time
                const endTime = Date.now();

                resolve({
                    status: res.ok ? "up" : "down",
                    message: res.statusText,
                    responseTime: endTime - startTime,
                    responseCode: res.status,
                });
            })
            .catch((error) => {
                // Get the end time
                const endTime = Date.now();

                resolve({
                    status: "down",
                    message: error.message,
                    responseTime: endTime - startTime,
                    responseCode: 500,
                });
            });
    });
}
