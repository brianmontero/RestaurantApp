const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../config/connection');

// funciones

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json('No autorizado');
    }
    else {
        let token = req.headers.authorization.substr(7);
        if (token !== '') {
            const content = jwt.verify(token, 'my_backend');
            req.data = content;
            next();
        } 
    }
}

// Routes

// Get all users
router.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM clients', (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
        }
        else {
            res.json(rows);
        }
    })
});

// Get one user by id
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM clients WHERE client_id = ?';

    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Get one user by username
router.get('/username/:user', (req, res) => {
    const { user } = req.params;
    let sql =  'SELECT * FROM clients WHERE username = ?';

    mysqlConnection.query(sql, [user], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Register user
router.post('/register', (req, res) => {
    const { username, email, client_password, role } = req.body;
    let sql = 'INSERT INTO clients (username, email, client_password, role) VALUES (?, ?, ?, ?)';

    mysqlConnection.query(sql, [username, email, client_password, role], 
    (err, rows, fields) => {
        if (err) {
            console.error('Error en el query de registro', err);
        }
        else {
            res.json('Usuario registrado con éxito');
        }
    });
});

// User login
router.post('/login', (req, res) => {
    const { username, client_password } = req.body;
    let sql = 'SELECT username, client_password FROM clients WHERE username = ? AND client_password = ?';

    mysqlConnection.query(sql, [username, client_password], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query', err);
        }
        else {
            if (rows.length > 0) {
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'my_backend');
                res.json({token});
            }
            else {
                res.send('Usuario o contraseña incorrectas');
            }
        }
    });
});

// Edit user
router.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, client_password, role } = req.body;
    let sql = 'UPDATE clients SET username = ?, email = ?, client_password = ?, role = ? WHERE client_id = ?';

    mysqlConnection.query(sql, [username, email, client_password, role, id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (users)', err);
        }
        else {
            res.send('Usuario editado exitosamente');
        }
    });
});

// Delete user 
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'DELETE FROM clients WHERE client_id = ?';

    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query', err);
        }
        else {
            res.send('Usuario eliminado exitosamente');
        }
    });
});

module.exports = router;