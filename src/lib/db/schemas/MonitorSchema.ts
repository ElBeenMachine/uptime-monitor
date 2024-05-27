import Schema from "../schema";

export const tableName = "monitors";

export default [
    {
        columnName: "id",
        dataType: "INTEGER",
        primaryKey: true,
        autoIncrement: true,
    },
    {
        columnName: "name",
        dataType: "TEXT",
        notNull: true,
    },
    {
        columnName: "address",
        dataType: "TEXT",
        notNull: true,
    },
    {
        columnName: "port",
        dataType: "INTEGER",
        notNull: true,
    },
    {
        columnName: "protocol",
        dataType: "TEXT",
        notNull: true,
    },
    {
        columnName: "requestInterval",
        dataType: "INTEGER",
        notNull: true,
    },
    {
        columnName: "timeout",
        dataType: "INTEGER",
        notNull: true,
    },
    {
        columnName: "status",
        dataType: "TEXT",
        notNull: true,
        default: "pending",
    },
] as Schema[];
