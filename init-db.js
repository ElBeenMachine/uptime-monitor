const mysql = require("mysql2/promise");

/**
 * Function to establish a connection to the MySQL database.
 * @param {number} attempts - Number of connection attempts made so far.
 * @returns {Promise} - A Promise that resolves with the database connection.
 */
async function connectToDb(attempts = 0) {
    try {
        // Define connection parameters
        const host = process.env.DB_HOST || "db";
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

        console.log("Connected to the database!");
        return connection;
    } catch (err) {
        console.error(err.message || err.stack);
        console.error("Unable to connect to the database. Retrying in 5 seconds...");
        // Retry connection up to 5 times
        if (attempts < 10) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return connectToDb(attempts + 1);
        } else {
            throw new Error("Unable to connect to the database after 10 attempts.");
        }
    }
}

// Attempt to establish a connection to the database and perform operations
async function main() {
    let connection;
    try {
        connection = await connectToDb();
        // Check if the 'uptimeUsers' table already exists
        const [rows] = await connection.execute("SHOW TABLES LIKE 'uptimeUsers'");
        if (rows.length > 0) {
            console.log("uptimeUsers table already exists.");
            return;
        }

        // Define the SQL query to create the 'uptimeUsers' table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS uptimeUsers (
                userID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                firstName VARCHAR(255),
                lastName VARCHAR(255),
                password VARCHAR(255),
                email VARCHAR(255),
                isAdmin BOOLEAN
            )`;

        // Execute the SQL query to create the 'uptimeUsers' table
        await connection.execute(createTableQuery);
        console.log("uptimeUsers table created successfully.");

        // Define the SQL query to create a default user
        const createDefaultUserQuery = `
            INSERT INTO uptimeUsers (firstName, lastName, password, email, isAdmin)
            VALUES ('Admin', 'User', 'admin', 'admin@example.com', true)`;

        // Execute the SQL query to create the default user
        await connection.execute(createDefaultUserQuery);
        console.log("Default user created successfully.");
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) {
            // Close the database connection
            try {
                await connection.end();
                console.log("MySQL connection closed.");
            } catch (err) {
                console.error("Error closing MySQL connection:", err.stack);
            }
        }
    }
}

// Start the process
main();
