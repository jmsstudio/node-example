class ProdutoRepository{
    constructor(connection) {
        this._conn = connection;
    }

    list(callback) {
        return this._conn.query('select * from produtos', callback);
    }

    save(data, callback) {
        return this._conn.query('insert into produtos set ?', data, callback);
    }

    delete(id, callback) {
        return this._conn.query('delete from produtos where id = ?', [id], callback);
    }


}


module.exports = () => {
    return ProdutoRepository;
};