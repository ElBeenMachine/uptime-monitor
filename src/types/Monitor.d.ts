export interface Monitor {
    id: number;
    name: string;
    address: string;
    port: number;
    protocol: string;
    requestInterval: number;
    timeout: number;
    status: "up" | "down" | "pending";
}
