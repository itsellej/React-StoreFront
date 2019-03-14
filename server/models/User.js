const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
require('custom-env').env(true)

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,
	{
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		dialect: 'postgres',
		operatorsAliases: false,

		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	});

const User = sequelize.define('users', {
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	firstname: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false
	},
	lastname: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
		hooks: {
			beforeCreate: (user) => {
				const salt = bcrypt.genSaltSync();
				user.password = bcrypt.hashSync(user.password, salt);
			}
		}
	});

User.prototype.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password)
}

// sequelize.sync()

module.exports = User;