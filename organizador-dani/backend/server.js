const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fran2730', // Reemplaza esto con tu contraseña real
    database: 'tasksDB'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('MySQL connected');
});

// Ruta para obtener todas las tareas que no están archivadas
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks WHERE status != "archived"', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para obtener todas las tareas archivadas
app.get('/archived-tasks', (req, res) => {
    db.query('SELECT * FROM tasks WHERE status = "archived"', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Ruta para agregar una nueva tarea
app.post('/tasks', (req, res) => {
    const task = req.body;
    db.query('INSERT INTO tasks SET ?', task, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...task });
    });
});

// Ruta para actualizar el estado de una tarea
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Ruta para eliminar una tarea archivada
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
