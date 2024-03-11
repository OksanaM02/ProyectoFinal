import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Opciones de configuración para Swagger
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'tiendecita',
      description: 'API para gestionar carrito de compras, pedidos, productos y usuarios',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description:'server'
      }
    ]
  },
  // Especificación de rutas y operaciones cargada desde el YAML
  apis: ['./swagger.yaml'],
};

// Genera la documentación Swagger
const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
