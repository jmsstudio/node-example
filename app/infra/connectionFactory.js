const mysql = require('mysql');

function createConnection() {
    let databaseName = 'nodejs';

    if (process.env.NODE_ENV == 'test') {
        databaseName = 'nodejs_test';
    }

    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: databaseName
    });
};

module.exports = () => {
    return createConnection;
}