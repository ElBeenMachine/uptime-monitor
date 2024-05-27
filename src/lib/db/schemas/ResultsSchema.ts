import Schema from "../schema";

export const tableName = "monitor_results";

export default [
    {
        columnName: "id",
        dataType: "INTEGER",
        primaryKey: true,
        autoIncrement: true,
    },
    {
        columnName: "monitor_id",
        dataType: "INTEGER",
        notNull: true,
        references: {
            table: "monitors",
            column: "id",
        },
    },
    {
        columnName: "status",
        dataType: "TEXT",
        notNull: true,
    },
    {
        columnName: "responseTime",
        dataType: "INTEGER",
        notNull: true,
    },
    {
        columnName: "timestamp",
        dataType: "TEXT",
        default: "CURRENT_TIMESTAMP",
    },
] as Schema[];
