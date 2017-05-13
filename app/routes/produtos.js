module.exports = (app) => {

    function _renderForm(res, errors={}, produto={}) {
        const status = Object.keys(errors).length > 0 ? 400 : 200;

        res.status(status).render('produtos/form', {errors:errors, produto: produto})
    }

    app.get('/produtos', (req, res, next) => {
        const conn = app.infra.connectionFactory();
        const produtoRepository = new app.infra.ProdutoRepository(conn);
        produtoRepository.list((err, result) => {
            if (err) {
                console.error(err);
                return next(err);
            } else {
                res.format({
                    html: () => res.render('produtos/lista', {produtos: result}),
                    json: () => res.json(result)
                });
            }
        });

        conn.end();
    });

    app.get('/produtos/form', (req, res) => {
        _renderForm(res);
    });

    app.post('/produtos', (req, res) => {
        const produto = req.body;

        req.assert('titulo', 'Título é obrigatório').notEmpty();
        req.assert('preco', 'Formato numérico inválido').isFloat();
        const err = req.validationErrors();

        if (err) {
            res.format({
                html: () => _renderForm(res, err, produto),
                json: () => res.status(400).json(err)
            });

        } else {

            const conn = app.infra.connectionFactory();
            const produtoRepository = new app.infra.ProdutoRepository(conn);
            produtoRepository.save(produto, (err, result) => {
                res.redirect('/produtos');
            });

            conn.end();
        }
    });

    app.delete('/produtos', (req, res) => {
        const id = req.body.id;

        const conn = app.infra.connectionFactory();
        const produtoRepository = new app.infra.ProdutoRepository(conn);
        produtoRepository.delete(id, (err, result) => {
            res.redirect('/produtos');
        });

        conn.end();

    });
};








