// Import the required modules
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Connection } from "mysql2/promise";
dotenv.config();

/**
 * Function to establish a connection to the MySQL database.
 *
 * @param {number} attempts - Number of connection attempts made so far.
 * @returns {Promise<Connection>} - A Promise that resolves with the database connection.
 */
const connectToDb = async (attempts = 0): Promise<Connection> => {
    // Define connection parameters
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASS;
    const database = process.env.DB_NAME;

    try {
        // Create a connection to the database
        const connection = await mysql.createConnection({
            host,
            user,
            password,
            database,
        });

        return connection;
    } catch (err) {
        console.warn(`🟠 | Unable to connect to the database on address ${host}. Retrying in 10 seconds...`);
        // Retry connection up to 10 times
        if (attempts < 10) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            return connectToDb(attempts + 1);
        } else {
            throw new Error("🔴 | Unable to connect to the database after 10 attempts.");
        }
    }
};

export { connectToDb };
