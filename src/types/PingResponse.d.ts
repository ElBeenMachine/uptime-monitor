export default interface PingResonse {
    status: "up" | "down" | "pending";
    message: string;
    responseTime: number;
    responseCode: number;
}
