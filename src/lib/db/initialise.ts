import fs from "fs";
import Database from "better-sqlite3";
import Schema from "./schema";
import { checkTableExists, createTable } from "./table";
import * as dotenv from "dotenv";
dotenv.config();

// Ensure database file exists
const DB_PATH = process.env.DEV_DB_PATH || "/data/db/uptime.db";
const dbFolder = DB_PATH.split("/").slice(0, -1).join("/");

try {
    // Create the database folder if it does not exist
    if (!fs.existsSync(dbFolder)) fs.mkdirSync(dbFolder, { recursive: true });
} catch (error) {
    console.error("Error creating database folder: ", error);
    process.exit(1);
}

// Create the database file if it does not exist
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
