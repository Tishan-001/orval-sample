import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { petsRouter } from './routes/pets';
import fs from 'fs';
import YAML from 'yaml';
import path from 'path';
import cors from 'cors';
import { connectDB } from './database/db';

const app: Application = express();

app.use(cors());
app.use(express.json());

connectDB();

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pets API',
      version: '1.0.0',
      description: 'A simple Express Pets API\n\n' +
                   'You can find the Swagger specification files here:\n' +
                   '- [Swagger JSON](/documentation/swagger.json)\n' +
                   '- [Swagger YAML](/documentation/swagger.yaml)',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
    components: {
      schemas: {
        Pet: {
          type: 'object',
          required: ['id', 'name', 'tag'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the pet',
            },
            name: {
              type: 'string',
              description: 'The name of the pet',
            },
            tag: {
              type: 'string',
              description: 'The tag of the pet',
            },
          },
        },
        NewPet: {
          type: 'object',
          required: ['name', 'tag'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the pet',
            },
            tag: {
              type: 'string',
              description: 'The tag of the pet',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

// Save as JSON
fs.writeFileSync('./swagger.json', JSON.stringify(openapiSpecification, null, 2));

// Save as YAML
fs.writeFileSync('./swagger.yaml', YAML.stringify(openapiSpecification));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Serve swagger.json
app.get('/documentation/swagger.json', (req: Request, res: Response) => {
  const swaggerPath = path.join(__dirname, '..', 'swagger.json');
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(swaggerPath);
});

// Serve swagger.yaml
app.get('/documentation/swagger.yaml', (req: Request, res: Response) => {
  const swaggerPath = path.join(__dirname, '..', 'swagger.yaml');
  res.setHeader('Content-Type', 'text/yaml');
  res.sendFile(swaggerPath);
});

app.use('/pets', petsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON is available at http://localhost:${PORT}/documentation/swagger.json`);
  console.log(`Swagger YAML is available at http://localhost:${PORT}/documentation/swagger.yaml`);
});