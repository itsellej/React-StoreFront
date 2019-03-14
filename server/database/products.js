const { Pool } = require('pg');
const { config } = require('../config/config')
const pool = new Pool(config.database)

const checkConnection = async () => {
	await pool.query('SELECT NOW()', (error, results) => {
		if (error) {
			return console.log(error);
		}
		console.log(`PostgreSQL connected at ${results.rows[0].now}`)
	})
}

const getProducts = async () => {
	try {
		const response = await pool.query('SELECT * FROM products ORDER BY id ASC')
		return response
	} catch (error) {
		return false
	}
}

const updateProduct = async (updatedShopQuantity, id) => {
	try {
		await pool.query('UPDATE products SET shop_quantity = $1 WHERE id = $2', [updatedShopQuantity, id])
		return true;
	} catch (error) {
		return false
	}
}

module.exports = { checkConnection, getProducts, updateProduct }