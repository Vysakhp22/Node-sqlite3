import express from 'express';
import { createTable, db } from './connect';

const app = express();
app.use(express.json());

app.get('/', (_, res) => {
    res.statusCode = 200;
    res.send('Hello World');
});

app.get('/users', (_, res) => {
    res.set('Content-Type', 'application/json');
    res.statusCode = 200;
    const sql = `SELECT * FROM users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.statusCode = 400;
            res.send({ "error": err.message || 'Error fetching users' });
            return;
        }
        res.statusCode = 200;
        res.send(JSON.stringify(rows));
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(sql, [name, email], (err) => {
        if (err) {
            res.statusCode = 400;
            res.send({ "error": err.message || 'Error adding user' });
            return;
        }
        res.statusCode = 201;
        res.send({ "res": 'User added successfully' });
    });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id = ?`;
    db.run(sql, [id], (err) => {
        if (err) {
            res.statusCode = 400;
            res.send({ "error": err.message || 'Error deleting user' });
            return;
        }
        res.statusCode = 200;
        res.send({ "res": 'User deleted successfully' });
    });
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    db.run(sql, [name, email, id], (err) => {
        if (err) {
            res.statusCode = 400;
            res.send({ "error": err.message || 'Error updating user' });
            return;
        }
        res.statusCode = 200;
        res.send({ "res": 'User updated successfully' });
    });
});

createTable();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


