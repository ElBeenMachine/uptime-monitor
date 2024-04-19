/**
 * @author - @ElBeenMachine
 */

// Import the required modules
import { connectToDb } from "@/utils/db";
import { hashPassword } from "@/utils/pass";

/**
 * Function to check if there is already a users table in the database. If the table does not exist, it will be created.
 *
 * @param {mysql.Connection} connection
 * @returns {boolean} Returns true if the table already exists, false otherwise.
 */
async function checkUserTable(connection: any) {
    // Check if the 'uptimeUsers' table already exists
    const [rows] = await connection.execute("SHOW TABLES LIKE 'users'");
    if (rows.length > 0) {
        console.warn("🟠 | Users table already exists.");
        return true;
    }

    // Create the users table if it did not exist
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                userID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE,
                isAdmin BOOLEAN DEFAULT false
            )`;

    try {
        // Execute the SQL query to create the 'uptimeUsers' table
        await connection.execute(createTableQuery);
        console.log("🟢 | Users table successfully created");
    } catch (error) {
        console.error("🔴| Error creating users table: ", error);
    } finally {
        return false;
    }
}

/**
 * Function to check if there is already a default user in the database.
 * If there is no users table, then a deafult user will be created.
 * Otherwise, it will be assumed that one is already present.
 *
 * @param {mysql.Connection} connection
 * @returns
 */
async function checkDefaultUser(connection: any) {
    // Check if user table already exists
    const tableExists = await checkUserTable(connection);

    // If the table exists, return true
    if (tableExists) return true;

    // Create a hashed password
    const hashedPassword = await hashPassword("changeMe");

    // If the table did not exist, create a default user
    const createDefaultUserQuery = `INSERT INTO users (firstName, lastName, username, password, email, isAdmin) VALUES ('Admin', 'User', 'Administrator', '${hashedPassword}', 'admin@example.com', true)`;

    try {
        // Execute the SQL query to create the default user
        await connection.execute(createDefaultUserQuery);
        console.log("🟢 | Default user created successfully.");
    } catch (error) {
        console.error("🔴 | Error creating default user: ", error);
    }
}

/**
 * Main function that establishes a connection to the database and performs the required operations to initialize it.
 */
async function main() {
    // Create a connection to the database
    const connection = await connectToDb();

    // Check if the default user exists
    const user = await checkDefaultUser(connection);

    // Close the database connection
    try {
        await connection.end();
        console.log("🟢 | MySQL connection closed.");
    } catch (error) {
        console.error("🔴 | Error closing MySQL connection: ", error);
    }
}

// Start the process
main();
