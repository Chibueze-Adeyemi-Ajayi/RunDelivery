const Joi = require('joi');
const BaseController = require('../controllers/BaseController');

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        // We can just send the error directly using the standard response format
        // Re-using BaseController logic strictly isn't possible as this is a function, 
        // but we can mimic the error structure.
        return res.status(400).json({
            status: 'error',
            message: errorMessage,
            error: 'Validation Error'
        });
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;
