/**
 * @author - @ElBeenMachine
 */

// Import the required modules
import { connectToDb } from "@/global_utils/db";
import { hashPassword } from "@/global_utils/pass";

/**
 * Function to check if there is already a users table in the database. If the table does not exist, it will be created.
 *
 * @param connection The connection to the database.
 * @returns {boolean} Returns true if the table already exists, false otherwise.
 */
async function checkUserTable(connection: any) {
    // Check if the 'uptimeUsers' table already exists
    const [rows] = await connection.execute("SHOW TABLES LIKE 'users'");
    if (rows.length > 0) {
        console.warn("🟠 | Users table already exists.");
        return true;
    }

    // Create the user table if it did not exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()), 
            firstName VARCHAR(255) NOT NULL, 
            lastName VARCHAR(255) NOT NULL, 
            username VARCHAR(255) NOT NULL UNIQUE, 
            password VARCHAR(255) NOT NULL, 
            email VARCHAR(255) UNIQUE
        )`;

    // Create a hashed password
    const hashedPassword = await hashPassword("changeMe");

    // If the table did not exist, create a default user
    const createDefaultUserQuery = `
        INSERT INTO users (
            firstName, 
            lastName, 
            username, 
            password, 
            email
        ) VALUES (
            'Admin', 
            'User', 
            'Administrator', 
            '${hashedPassword}', 
            'admin@example.com'
        )`;

    try {
        // Execute the SQL query to create the 'uptimeUsers' table
        await connection.execute(createTableQuery);
        await connection.execute(createDefaultUserQuery);
        console.log("🟢 | Users table successfully created and default user created");
    } catch (error) {
        console.error("🔴| Error creating users table: ", error);
    } finally {
        return false;
    }
}

/**
 * Function to check if the monitors table exists in the database. If the table does not exist, it will be created.
 *
 * @param connection The connection to the database.
 */
async function checkMonitorTable(connection: any) {
    // Check if the 'monitors' table already exists
    const [rows] = await connection.execute("SHOW TABLES LIKE 'monitors'");
    if (rows.length > 0) {
        console.warn("🟠 | Monitors table already exists.");
        return true;
    }

    // Create the monitors table if it did not exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS monitors (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            port INT NOT NULL,
            protocol VARCHAR(255) NOT NULL,
            requestInterval INT NOT NULL,
            timeout INT NOT NULL,
            status VARCHAR(255) DEFAULT "down"
        )`;

    // INSERT INTO monitors (name, address, port, protocol,requestInterval, timeout) VALUES ('Google Monitor', 'google.com', 443, 'https', 15, 2);

    // Insert test monitor into db
    const insertTestMonitorQuery = `
        INSERT INTO monitors (
            name, 
            address, 
            port, 
            protocol,
            requestInterval, 
            timeout
        ) VALUES (
            'Test Monitor', 
            'localhost', 
            3000, 
            'http',
            15, 
            2
        ); `;

    try {
        // Execute the SQL query to create the 'monitors' table
        await connection.execute(createTableQuery);
        await connection.execute(insertTestMonitorQuery);
        console.log("🟢 | Monitors table successfully created and default monitor created");
    } catch (error) {
        console.error("🔴 | Error creating monitors table: ", error);
    } finally {
        return false;
    }
}

/**
 * Function to check if the history table exists in the database. If the table does not exist, it will be created.
 */
async function checkHistoryTable(connection: any) {
    // Check if the 'history' table already exists
    const [rows] = await connection.execute("SHOW TABLES LIKE 'history'");
    if (rows.length > 0) {
        console.warn("🟠 | History table already exists.");
        return true;
    }

    // Create the history table if it did not exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS history (
            id INT AUTO_INCREMENT,
            monitorID VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            FOREIGN KEY (monitorID) REFERENCES monitors(id)
        )`;

    try {
        // Execute the SQL query to create the 'history' table
        await connection.execute(createTableQuery);
        console.log("🟢 | History table successfully created");
    } catch (error) {
        console.error("🔴 | Error creating history table: ", error);
    } finally {
        return false;
    }
}

/**
 * Main function that establishes a connection to the database and performs the required operations to initialize it.
 */
async function main() {
    // Create a connection to the database
    const connection = await connectToDb();

    // Check if the default user exists
    await checkUserTable(connection);

    // Check if the monitors table exists
    await checkMonitorTable(connection);

    // Check if the history table exists
    await checkHistoryTable(connection);

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
