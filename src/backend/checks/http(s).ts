import responseInterface from "./responseInterface";

/**
 * Function to ping a http address
 *
 * @param address The address to ping
 */
export async function pingHttp(address: string, port: number) {
    // Ping the monitor
    try {
        await fetch(`http://${address}:${port}`);

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
export async function pingHttps(address: string, port: number) {
    // Ping the monitor
    try {
        await fetch(`https://${address}:${port}`);

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
