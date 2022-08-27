const router = require('express').Router();
const mysqlConnection = require('../config/connection');

// Get all favorites
router.get('/get/favorites', (req, res) => {
    let sql = 'SELECT * FROM favorites';

    mysqlConnection.query(sql, (err, rows, fields) => {
        if (err) {
            console.error('Error en el query', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Get favorites by client
router.get('/get/favorites/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM favorites WHERE client_id = ?';

    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Add menu to favorites
router.post('/add/favorite/:client/:menu', (req, res) => {
    const { client, menu } = req.params;
    let sql = 'INSERT INTO favorites (client_id, menu_id) VALUES (?, ?)';

    mysqlConnection.query(sql, [client, menu], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menu)', err);
        }
        else {
            res.json('Favorito agregado con éxito');
        }
    });
});

// Delete menu from favorties 
router.delete('/delete/favorite/:client/:menu', (req, res) => {
    const { client, menu } = req.params;
    let sql = 'DELETE FROM favorites WHERE client_id = ? AND menu_id = ?';

    mysqlConnection.query(sql, [client, menu], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menu)', err);
        }
        else {
            res.json('Favorito eliminado con éxito');
        }
    });
});

module.exports = router;