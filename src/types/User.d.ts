import { User } from "lucia";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
}
