const app = require('./index')
const db = require('./database');
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`)
	db.checkConnection()
})