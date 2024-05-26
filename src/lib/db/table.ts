import { Database } from "better-sqlite3";
import Schema from "./schema";

/**
 * Function to check if a table exists in the database.
 *
 * @param {Database} db The database object
 * @param {string} tableName The name of the table to be checked
 * @returns {boolean} True if the table exists, false otherwise
 */
export function checkTableExists(db: Database, tableName: string) {
    // Check if the table exists
    const check = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`).get();

    if (check) {
        return true;
    }

    // Return false if the table does not exist
    return false;
}

/**
 * Function to create a table in the database.
 *
 * @param {Database} db The database object
 * @param {string} tableName The name of the table to be created
 * @param {Schema[]} columns  An array of column schemas
 */
export function createTable(db: Database, tableName: string, columns: Schema[]) {
    // Iterate through the columns
    const columnDefinitions = columns.map((column) => {
        let definition = `${column.columnName} ${column.dataType}`;

        if (column.primaryKey) definition += " PRIMARY KEY";
        if (column.notNull) definition += " NOT NULL";
        if (column.unique) definition += " UNIQUE";
        if (column.default) definition += ` DEFAULT ${column.default}`;
        if (column.references) definition += ` REFERENCES ${column.references.table}(${column.references.column})`;

        return definition;
    });

    // Create the table
    const createTable = db.prepare(`CREATE TABLE ${tableName} (${columnDefinitions.join(", ")})`);
    createTable.run();
}
