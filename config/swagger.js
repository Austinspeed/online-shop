const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Shop API',
      version: '1.0.0',
      description:
        'REST API for the Online Shop application generated using swagger-jsdoc.'
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server'
      }
    ],

    tags: [
      {
        name: 'Products',
        description: 'Operations related to products'
      }
    ],

    components: {
      schemas: {
        Product: {
          type: 'object',
          required: [
            'title',
            'summary',
            'price',
            'description',
            'image'
          ],
          properties: {
            id: {
              type: 'string',
              description: 'MongoDB ObjectId',
              example: '6879f77f36b2b4e37dfdc123'
            },
            title: {
              type: 'string',
              example: 'Gaming Laptop'
            },
            summary: {
              type: 'string',
              example: 'High performance laptop'
            },
            price: {
              type: 'number',
              format: 'float',
              example: 2499.99
            },
            description: {
              type: 'string',
              example: 'Powerful gaming laptop with RTX graphics.'
            },
            image: {
              type: 'string',
              description: 'Image filename',
              example: 'laptop.jpg'
            },
            imagePath: {
              type: 'string',
              readOnly: true,
              example: 'product-data/images/laptop.jpg'
            },
            imageUrl: {
              type: 'string',
              readOnly: true,
              example: '/products/assets/images/laptop.jpg'
            }
          }
        }
      }
    }
  },

  apis: [
    './routes/api/*.js'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;