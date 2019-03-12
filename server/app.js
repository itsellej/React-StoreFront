const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const products = require('./routes/products');
const users = require('./routes/users')
const main = require('./routes/main')

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: 'randomsecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

app.use('/', main)
app.use('/api/products', products)
app.use('/users', users)
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
});

module.exports = app;