module.exports = (app) => {
    app.get('/promocoes/form', (req, res) => {
        const conn = app.infra.connectionFactory();
        const produtoRepository = new app.infra.ProdutoRepository(conn);

        produtoRepository.list((err, result) => {
            res.render('promocoes/form', {livros: result});
        });
    });

    app.post('/promocao', (req, res) => {
        const promocao = req.body;
        console.log(promocao);

        app.get('io').emit('promocao', promocao);

        res.redirect('/promocoes/form');
    });
};