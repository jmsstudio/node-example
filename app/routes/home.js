module.exports = (app) => {

    app.get('/', (req, res) => {
        const conn = app.infra.connectionFactory();
        const produtoRepository = new app.infra.ProdutoRepository(conn);

        produtoRepository.list((err, result) => {
            res.render('home/index', {livros: result});
        });
    });
}