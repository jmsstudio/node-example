const pg = require('pg');

//TODO http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/

function createConnection() {
    let databaseName = 'nodejs';

    if (process.env.NODE_ENV == 'test') {
        databaseName = 'nodejs_test';
    }

    const connectionString = process.env.DATABASE_URL || `postgres://jefferson:12345@localhost:5432/${databaseName}`;

    const client = new pg.Client(connectionString);
    return client;
};

module.exports = () => {
    return createConnection;
}