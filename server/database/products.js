const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DATABASE_USER,
	host: process.env.DATABASE_HOST,
	database: 'shopfront_db',
	password: process.env.DATABASE_PASSWORD,
	port: process.env.DATABASE_PORT
})

const checkConnection = (request, response) => {
	pool.query('SELECT NOW()', (error, results) => {
		if (error) {
			return console.log(error);
		}
		console.log(`PostgreSQL connected at ${results.rows[0].now}`)
	})
}

const getProducts = (request, response) => {
	pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
		if (error) {
			return response.status(404).send('Does not exist')
		}
		response.status(200).json(results.rows)
	})
}

const updateProduct = (request, response) => {
	const id = parseInt(request.params.id)
	const updatedShopQuantity = request.body.shop_quantity

	pool.query('UPDATE products SET shop_quantity = $1 WHERE id = $2', [updatedShopQuantity, id],
		(error, results) => {
			if (error) {
				return response.status(400).send(`Error updating product with id ${id}`)
			}
			return response.status(200).send(`Product with ID: ${id} modified with shop_quantity of ${updatedShopQuantity}`)
		})
}

module.exports = { checkConnection, getProducts, updateProduct }