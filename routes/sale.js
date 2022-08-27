const router = require('express').Router();
const mysqlConnection = require('../config/connection');

// Get all sales
router.get('/sales', (req, res) => {
    let sql = 'SELECT * FROM sales';

    mysqlConnection.query(sql, (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (sales)', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Get sale by client
router.get('/sales/client/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM sales WHERE client_id = ?';

    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (sales)', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Post new sale
router.post('/add/sale', (req, res) => {
    const { client_id, amount, total } = req.body;
    let sql = 'INSERT INTO sales (client_id, amount, total) VALUES (?, ?, ?)';

    mysqlConnection.query(sql, [client_id, amount, total], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (sales)', err);
        }
        else {
            res.json('Compra realizada con éxito');
        }
    });
});

module.exports = router;