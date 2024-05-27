import Schema from "../schema";

export const tableName = "sessions";

export default [
    {
        columnName: "id",
        dataType: "TEXT",
        primaryKey: true,
    },
    {
        columnName: "expires_at",
        dataType: "INTEGER",
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
