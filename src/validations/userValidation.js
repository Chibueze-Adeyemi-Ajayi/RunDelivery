const Joi = require('joi');

const createUser = {
    body: Joi.object().keys({
        username: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        role: Joi.string().valid('user', 'admin'),
    }),
};

const getUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

module.exports = {
    createUser,
    getUser,
};
