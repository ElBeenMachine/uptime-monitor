export interface Monitor {
    id: string;
    name: string;
    address: string;
    port: number;
    protocol: string;
    requestInterval: number;
    timeout: number;
    status: string;
}
