const db = require('../database')

//contain methods to query database
class Products {
    static retrieveAll(callback) {
        db.query('SELECT * FROM products', function (err, res) {
            if (err.error) {
                return callback(err);
            }
            callback(res);
        })
    }
}

module.exports = Products;