const path = require('path')
const express = require('express');
const User = require('../models/User');

const router = express.Router();

const sessionChecker = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid) {
		res.redirect('/dashboard');
	} else {
		next();
	}
};

router.get('/', sessionChecker, (req, res) => {
	res.redirect('/users/dashboard');
});

router.route('/signup')
	.get(sessionChecker, (req, res) => {
		res.sendFile(path.join(__dirname + '/../views/signup.html'));
	})
	.post((req, res) => {
		User.create({
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password
		})
			.then(user => {
				req.session.user = user.dataValues;
				res.redirect('/users/dashboard');
			})
			.catch(error => {
				res.redirect('/users/signup');
			});
	});

router.route('/login')
	.get(sessionChecker, (req, res) => {
		res.sendFile(path.join(__dirname + '/../views/login.html'));
	})
	.post((req, res) => {
		var username = req.body.username,
			password = req.body.password;

		User.findOne({ where: { username: username } }).then(function (user) {
			if (!user) {
				res.redirect('/users/login');
			} else if (!user.validPassword(password)) {
				res.redirect('/users/login');
			} else {
				req.session.user = user.dataValues;
				res.redirect('/users/dashboard');
			}
		});
	});

router.get('/dashboard', (req, res) => {
	if (req.session.user && req.cookies.user_sid) {
		res.sendFile(path.join(__dirname + '/../views/dashboard.html'));
	} else {
		res.redirect('/users/login');
	}
});

router.get('/logout', (req, res) => {
	if (req.session.user && req.cookies.user_sid) {
		res.clearCookie('user_sid');
		res.redirect('/users/login');
	} else {
		res.redirect('/users/login');
	}
});

module.exports = router;