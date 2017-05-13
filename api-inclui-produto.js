const http = require('http');

const config = {
    endpoint: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

let produto = {
    titulo: 'Livro 1',
    descricao: 'Desc livro 1',
    preco: 11.9
};

let client = http.request(config, (res) => {
    console.log('Incluindo produto: ');
    console.log(res.statusCode);
    res.on('data', (body) => {
        console.log(''+body);
    });
});

client.end(JSON.stringify(produto));