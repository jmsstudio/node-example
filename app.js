const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('io', io);

const port = process.env.PORT || 3000;

const server = http.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Servidor em execução em http://%s:%s', host, port);
});