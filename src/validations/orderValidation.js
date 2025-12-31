const Joi = require('joi');

const createOrder = {
    body: Joi.object().keys({
        customer: Joi.string().required(),
        driver: Joi.string(),
        items: Joi.array().items(
            Joi.object().keys({
                name: Joi.string().required(),
                quantity: Joi.number().required().min(1),
            })
        ).required(),
        status: Joi.string().valid('PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'),
    }),
};

const updateOrderStatus = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        status: Joi.string().required().valid('PENDING', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'),
    }),
};

module.exports = {
    createOrder,
    updateOrderStatus,
};
