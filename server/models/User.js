const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('postgres://ellej1@localhost:5432/shopfront_db');

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

sequelize.sync()
	.then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
	.catch(error => console.log('This error occured', error));

module.exports = User;