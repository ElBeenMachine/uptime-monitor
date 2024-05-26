import Schema from "../schema";

export const tableName = "users";

export default [
    {
        columnName: "id",
        dataType: "INTEGER",
        primaryKey: true,
        autoIncrement: true,
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
        unique: true,
    },
    {
        columnName: "password",
        dataType: "TEXT",
        notNull: true,
    },
    {
        columnName: "email",
        dataType: "TEXT",
        notNull: true,
        unique: true,
    },
] as Schema[];
