export default interface Schema {
    columnName: string;
    dataType: "TEXT" | "INTEGER" | "REAL" | "BLOB" | "NULL";
    primaryKey?: boolean;
    autoIncrement?: boolean;
    notNull?: boolean;
    unique?: boolean;
    default?: string;
    references?: {
        table: string;
        column: string;
    }
}