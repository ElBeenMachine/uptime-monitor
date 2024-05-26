import Schema from "../schema";

export const tableName = "sessions";

export default [
    {
        columnName: "id",
        dataType: "INTEGER",
        primaryKey: true,
        autoIncrement: true,
    },
    {
        columnName: "expires_at",
        dataType: "TEXT",
        notNull: true,
    },
    {
        columnName: "user_id",
        dataType: "INTEGER",
        notNull: true,
        references: {
            table: "users",
            column: "id",
        },
    },
] as Schema[];
