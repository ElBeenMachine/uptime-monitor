// Import the required modules
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

//

/**
 * Function to establish a connection to the MySQL database.
 *
 * @param {number} attempts - Number of connection attempts made so far.
 * @returns {Promise} - A Promise that resolves with the database connection.
 */
const connectToDb = async (attempts = 0): Promise<any> => {
    try {
        // Define connection parameters
        const host = process.env.DB_HOST || "uptime_db";
        const user = process.env.DB_USER;
        const password = process.env.DB_PASS;
        const database = process.env.DB_NAME;

        // Create a connection to the database
        const connection = await mysql.createConnection({
            host,
            user,
            password,
            database,
        });

        console.log("🟢 | Connected to the database");
        return connection;
    } catch (err) {
        console.warn("🟠 | Unable to connect to the database. Retrying in 5 seconds...");
        // Retry connection up to 5 times
        if (attempts < 10) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return connectToDb(attempts + 1);
        } else {
            throw new Error("🔴 | Unable to connect to the database after 10 attempts.");
        }
    }
};

export { connectToDb };
