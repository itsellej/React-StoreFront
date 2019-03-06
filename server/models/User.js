const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    first_name: Joi.string().min(2).max(70).required(),
    last_name: Joi.string().min(2).max(70).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(25).alphanum().required(),
}).with('name', 'password').with('name', 'email');

module.exports = { newUserSchema }