import sqlite3 from 'sqlite3';
import Schema from './schema';

/**
 * Function to initialise the database.
 * 
 * This function will check if the necessary tables exist in the database and create them if they do not.
 */
export default function initialiseDatabase() {
    if(!checkTableExists("users")) createUsersTable();
}

/**
 * Function to check if a table exists in the database.
 * 
 * @param {string} tableName The name of the table to be checked 
 * @returns {boolean} True if the table exists, false otherwise
 */
function checkTableExists(tableName: string) {
    // Connect to the database
    const db = new sqlite3.Database('./db/uptime.db');

    // Check if the table exists
    db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err, row) => {
        if (err) {
            console.error(`Error checking if table '${tableName}' exists: ${err.message}`);
            return false;
        }

        if (row) {
            console.log(`Table '${tableName}' already exists`);
            return true;
        }
    });

    // Close the database connection
    db.close();

    // Return false if the table does not exist
    return false;
}

/**
 * Function to create a table in the database.
 * 
 * @param {string} tableName The name of the table to be created
 * @param schema  The schema of the table to be created
 */
function createTable(tableName: string, columns: Schema[]) {
    // Connect to the database
    const db = new sqlite3.Database('./db/uptime.db');

    // Iterate through the columns
    

    // Close the database connection
    db.close();
}

function createUsersTable() {
    const columns: Schema[] = [
        {
            columnName: "id",
            dataType: "INTEGER",
            primaryKey: true,
            default: "UUID()"
        },
        {
            columnName: "firstName",
            dataType: "TEXT",
            notNull: true,
        },
        {
            columnName: "lastName",
            dataType: "TEXT",
            notNull: true,
        },
        {
            columnName: "username",
            dataType: "TEXT",
            notNull: true,
            unique: true
        },
        {
            columnName: "password",
            dataType: "TEXT",
            notNull: true
        },
        {
            columnName: "email",
            dataType: "TEXT",
            notNull: true,
            unique: true
        }
    ];

    createTable("users", columns);
}

function createSessionsTable() {}

function createMonitorsTable() {}

function createMonitorResultsTable() {}