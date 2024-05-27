import { User } from "lucia";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}
