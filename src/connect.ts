import { Database, verbose } from "sqlite3";

const sqlite3 = verbose();

export const db: Database = new sqlite3.Database("mydata.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        throw new Error(err.message || 'Error connecting to the database');
        return;
    }
    console.log('Connected to the in-memory SQlite database.');
});

export const createTable = () => {
    const command = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);`;

    db.run(command, [], (err) => {
        if (err) {
            throw new Error(err.message || 'Error creating table');
            return;
        }
        console.log('Table created successfully');
    });
}
