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
        name: 'Authentication',
        description: 'Authentication and user management'
      },
      {
        name: 'Products',
        description: 'Operations related to products'
      },
      {
        name: 'Cart',
        description: 'Shopping cart operations'
      },
      {
        name: 'Orders',
        description: 'Customer order operations'
      },
      {
        name: 'Admin',
        description: 'Administrative operations'
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
        },

        CartItem: {
          type: 'object',
          properties: {
            product: {
              $ref: '#/components/schemas/Product'
            },
            quantity: {
              type: 'integer',
              example: 2
            },
            totalPrice: {
              type: 'number',
              format: 'float',
              example: 4999.98
            }
          }
        },

        Cart: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem'
              }
            },
            totalQuantity: {
              type: 'integer',
              example: 2
            },
            totalPrice: {
              type: 'number',
              format: 'float',
              example: 4999.98
            }
          }
        },

        Address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
              example: '15 Admiralty Way'
            },
            postalCode: {
              type: 'string',
              example: '101001'
            },
            city: {
              type: 'string',
              example: 'Lagos'
            }
          }
        },

        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '6879f77f36b2b4e37dfdc111'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            name: {
              type: 'string',
              example: 'John Doe'
            },
            address: {
              $ref: '#/components/schemas/Address'
            }
          }
        },

        Order: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '6879f77f36b2b4e37dfdc456'
            },
            status: {
              type: 'string',
              enum: [
                'pending',
                'fulfilled',
                'cancelled'
              ],
              example: 'pending'
            },
            date: {
              type: 'string',
              format: 'date-time',
              example: '2026-07-19T12:00:00.000Z'
            },
            formattedDate: {
              type: 'string',
              example: 'Sat, July 19, 2026'
            },
            userData: {
              $ref: '#/components/schemas/User'
            },
            productData: {
              $ref: '#/components/schemas/Cart'
            }
          }
        },

        SignupRequest: {
          type: 'object',
          required: [
            'email',
            'confirmEmail',
            'password',
            'fullname',
            'street',
            'postal',
            'city'
          ],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            confirmEmail: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'password123'
            },
            fullname: {
              type: 'string',
              example: 'John Doe'
            },
            street: {
              type: 'string',
              example: '15 Admiralty Way'
            },
            postal: {
              type: 'string',
              example: '101001'
            },
            city: {
              type: 'string',
              example: 'Lagos'
            }
          }
        },

        LoginRequest: {
          type: 'object',
          required: [
            'email',
            'password'
          ],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'password123'
            }
          }
        },

        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'An error occurred.'
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