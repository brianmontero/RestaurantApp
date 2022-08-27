const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'qz8si2yulh3i7gl3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'y32nd9fihghdjvdv',
    password: 'bjod4d98wftku1mo',
    database: 'rdmdb83udrcc7uze'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error en la conexión de BDD', err);
    }
    else {
        console.log('BDD conectada');
    }
});

module.exports = mysqlConnection;