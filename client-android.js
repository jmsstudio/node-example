const http = require('http');

const config = {
    endpoint: 'localhost',
    port: 3000,
    path: '/produtos',
    headers: {
        'Accept': 'application/json'
    }
};

http.get(config, (res) => {
    console.log('Buscando dados em formato especifico');
    console.log(res.statusCode);
    res.on('data', (body) => {
        console.log(''+body);
    });
});