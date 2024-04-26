import responseInterface from "./responseInterface";

/**
 * Function to ping a http address
 *
 * @param address The address to ping
 */
export async function pingHttp(address: string, port: number, timeout: number = 10) {
    // Ping the monitor
    try {
        await fetch(`http://${address}:${port}`, { signal: AbortSignal.timeout(timeout * 1000) });

        return {
            timestamp: new Date().toISOString(),
            status: "up",
        } as responseInterface;
    } catch (error) {
        return {
            timestamp: new Date().toISOString(),
            status: "down",
        } as responseInterface;
    }
}

/**
 * Function to ping a https address
 *
 * @param address The address to ping
 */
export async function pingHttps(address: string, port: number, timeout: number = 10) {
    // Ping the monitor
    try {
        await fetch(`https://${address}:${port}`, { signal: AbortSignal.timeout(timeout * 1000) });

        return {
            timestamp: new Date().toISOString(),
            status: "up",
        } as responseInterface;
    } catch (error) {
        return {
            timestamp: new Date().toISOString(),
            status: "down",
        } as responseInterface;
    }
}
