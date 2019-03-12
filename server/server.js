const app = require('./app')
const db = require('./database/products');
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`)
	db.checkConnection()
})