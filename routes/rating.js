const router = require('express').Router();
const mysqlConnection = require('../config/connection');

// Get all ratings
router.get('/ratings', (req, res) => {

    mysqlConnection.query('SELECT * FROM ratings', (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menus)', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Get individual rating by client
router.get('/rating/client/:id', (req, res) => {
    const { id } = req.params;

    let sql = 'SELECT * FROM ratings WHERE client_id = ?';
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menus)', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Get individual rating by menu
router.get('/rating/menu/:id', (req, res) => {
    const { id } = req.params;

    let sql = 'SELECT * FROM ratings WHERE menu_id = ?';

    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menus)', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Post rating
router.post('/add/rating', (req, res) => {
    const { client_id, menu_id, stars, comment } = req.body;

    let sql = 'INSERT INTO ratings (client_id, menu_id, stars, comment) VALUES (?, ?, ?, ?)';

    mysqlConnection.query(sql, [client_id, menu_id, stars, comment], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (ratings)', err);
        }
        else {
            res.json('Rating registrado con éxito');
        }
    });
});

// Delete rating
router.delete('/delete/rating/:client/:menu', (req, res) => {
    const { client, menu } = req.params;
    let sql = 'DELETE FROM ratings WHERE client_id = ? AND menu_id = ?';

    mysqlConnection.query(sql, [client, menu], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (ratings)', err);
        }
        else {
            res.json('Comentario eliminado exitosamente');
        }
    });
});

module.exports = router;