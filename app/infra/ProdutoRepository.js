class ProdutoRepository{
    constructor(client) {
        this._client = client;
    }

    list(callback) {
        this._client.connect();
        this._client.query('select * from produtos')
            .then(res => {
                return res.rows;
            })
            .then((data) => {
                callback(null, data);
            })
            .then(() => this._client.end());
    }

    save(dados, callback) {
        this._client.connect();
        this._client.query('insert into produtos (titulo, preco, descricao) values ($1, $2, $3)', 
            [dados.titulo, dados.preco, dados.descricao])
                .then((data) => {
                    callback(null, data);
                })
                .then(() => this._client.end());
    }

    delete(id, callback) {
        this._client.connect();
        this._client.query('delete from produtos where id = $1', [id])
            .then((data) => {
                callback(null, data);
            })
            .then(() => this._client.end());
    }


}


module.exports = () => {
    return ProdutoRepository;
};