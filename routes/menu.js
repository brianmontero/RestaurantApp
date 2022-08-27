const router = require('express').Router();
const mysqlConnection = require('../config/connection');

// Get all menus
router.get('/menus', (req, res) => {

    mysqlConnection.query('SELECT * FROM menus', (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menus)', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Get one menu
router.get('/menu/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM menus WHERE menu_id = ?';

    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menus)', err);
        }
        else {
            res.json(rows);
        }
    });
});

// Add one menu 
router.post('/add/menu', (req, res) => {
    const { title, ingredients, menu_description, price, category, image } = req.body;
    let sql = 'INSERT INTO menus (title, ingredients, menu_description, price, category, image) VALUES (?, ?, ?, ?, ?, ?)';

    mysqlConnection.query(sql, [title, JSON.stringify(ingredients), menu_description, price, category, image], 
    (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menus)', err);
        }
        else {
            res.json('Menú ingresado con éxito');
        }
    });
});

// Edit one menu
router.put('/edit/menu/:id', (req, res) => {
    const { id } = req.params;
    const { title, ingredients, menu_description, price, category, image } = req.body;

    let sql = "UPDATE menus SET title = ?, ingredients = ?, menu_description = ?, price = ?, category = ?, image = ? WHERE menu_id = ?";

    mysqlConnection.query(sql, [title, ingredients, menu_description, price, category, image, id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menus)', err);
        }
        else {
            res.json('Menú editado con éxito');
        }
    });
});

// Delete one menu
router.delete('/delete/menu/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'DELETE FROM menus WHERE menu_id = ?';

    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en el query (menus)', err);
        }
        else {
            res.json('Menú eliminado con éxito');
        }
    });
});

module.exports = router;