import fs from "fs";
import Database from "better-sqlite3";
import Schema from "./schema";
import { hashPassword } from "@/lib/pass";
import { checkTableExists, createTable } from "./table";

// Ensure database file exists
if (!fs.existsSync("./db")) fs.mkdirSync("./db");
const DB_PATH = "./db/uptime.db";
const db = new Database(DB_PATH);

// Export the path to be used in other files
export { DB_PATH };

/**
 * Function to initialise the database.
 *
 * This function will check if the necessary tables exist in the database and create them if they do not.
 */
export default async function initialiseDatabase() {
    // Get the schemas directory
    const schemas = fs.readdirSync("./src/lib/db/schemas");

    // Loop through the schemas
    for (const schema of schemas) {
        // Import the schema
        const { default: schemaObject, tableName }: { default: Schema[]; tableName: string } = await import(`./schemas/${schema}`);

        // If there is no table name, skip this schema
        if (!tableName) continue;

        // If there is no schema object, skip this schema
        if (!schemaObject) continue;

        // Check if the table exists
        if (!checkTableExists(db, tableName)) {
            // Create the table
            createTable(db, tableName, schemaObject);
        } else {
            console.log(`Table "${tableName}" already exists`);
        }
    }

    // If there are no users, create a default user
    try {
        const userCount = db.prepare("SELECT id from users").all().length;
        if (userCount === 0) {
            // Create the default user
            const createUser = db.prepare("INSERT INTO users (firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?)");
            createUser.run("Default", "User", "DefaultUser", await hashPassword("changeMe"), "admin@example.com");
        }
    } catch (error) {
        console.error("Error creating default user: ", error);
    }

    try {
        // If there are no monitors, create a default monitor
        const monitorCount = db.prepare("SELECT id from monitors").all().length;
        if (monitorCount === 0) {
            // Create the default monitor
            const createMonitor = db.prepare(
                "INSERT INTO monitors (name, address, port, protocol, requestInterval, timeout) VALUES (?, ?, ?, ?, ?, ?)"
            );
            createMonitor.run("Default Monitor", "example.com", 443, "https", 60, 30);
        }
    } catch (error) {
        console.error("Error creating default monitor: ", error);
    }

    // Close the database
    db.close();
}
