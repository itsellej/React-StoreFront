const db = require('../database')

//contain methods to query database
class Products {
    static retrieveAll() {
        db.query('SELECT * FROM weather', function (err, res) {
            if (err.error) {
                return callback(err);
            }
            callback(res);
        })
    }
}

module.exports = Products;