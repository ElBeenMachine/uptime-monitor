import Database from "better-sqlite3";
import { DB_PATH } from "./initialise";

export function getConnection() {
    return new Database(DB_PATH);
}
