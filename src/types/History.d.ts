export interface MonitorHistory {
    id: string;
    monitorID: string;
    timestamp: string;
    status: "up" | "down";
}
