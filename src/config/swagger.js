const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: config.app.name,
            version: '1.0.0',
            description: 'API Documentation for RunDelivery Logistics System',
            contact: {
                name: 'API Support',
                email: 'support@rundelivery.com',
            },
        },
        servers: [
            {
                url: `http://localhost:${config.app.port}/api/v1`,
                description: 'Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], // Files containing annotations
};

const specs = swaggerJsdoc(options);

module.exports = specs;
