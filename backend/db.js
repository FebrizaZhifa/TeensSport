const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',     // Alamat MySQL di Laragon
    user: 'root',          // Username MySQL
    password: '',          // Password MySQL (default kosong)
    database: 'teensport', // Nama database
});

module.exports = pool;
