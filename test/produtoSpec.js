const express = require('../config/express');
const request = require('supertest')(express());

describe("#Produtos", () => {

    function clearDB(cb) {
        const conn = express().infra.connectionFactory();
        conn.query('delete from produtos', (err, result) => {
            if (!err) {
                cb();
            } else {
                console.error(err);
            }
        });
    }

    beforeEach((done) => {
        clearDB(done);
    });

    afterEach((done) => {
        clearDB(done);
    });

    it("#Deve retornar os dados em formato JSON", (done) => {
        request
            .get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it("#Deve retornar os dados em formato HTML", (done) => {
        request
            .get('/produtos')
            .expect('Content-Type', /text\/html/)
            .expect(200, done);
    });

    it("#Deve dar erro ao tentar cadastrar produto com dados inválidos", (done) => {
        request
            .post('/produtos')
            .send({titulo:'', descricao: 'desc'})
            .expect(400, done);
    });

    it("#Deve permitir cadastrar produto com dados válidos", (done) => {
        request
            .post('/produtos')
            .send({titulo:'prod 1', descricao: 'desc', preco: 11.90})
            .expect(302, done);
    });

});