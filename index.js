const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.use(express.static('bin'));
app.use(express.static(path.join(__dirname, 'bin')));

// RUTAS

// USER ROUTES
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

// MENU ROUTES
const menuRoutes = require('./routes/menu');
app.use('/', menuRoutes);

// RATINGS ROUTES
const ratingRoutes = require('./routes/rating');
app.use('/', ratingRoutes);

// SALES ROUTES
const saleRoutes = require('./routes/sale');
app.use('/', saleRoutes);

// FAVORITES ROUTES
const favoriteRoutes = require('./routes/favorite');
app.use('/', favoriteRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'bin/index.html'));
})

app.listen(port, (err) => { 
    if (err) {
        console.error('Error en el inicio del servidor: ', err);
    }
    else {
        console.log('Server running on port', port);
    }
});
