import { exit } from 'process';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import initializeServices from './initilizeServices';

import restapiRoutes from './restapi';

/**
 * Initilize the services and the RestAPI server
 */
(async () => {
  // Load the environment variables
  dotenv.config();

  // Required parameters
  const restapiToken = process.env.RESTAPI_TOKEN;
  if (!restapiToken) {
    console.log('The RESTAPI_TOKEN environment variable cannot be empty');
    exit(1);
  }

  // Load the services
  const services = await initializeServices();

  // Prepare the server
  const restapiServer = express();
  restapiServer.use(cors());
  restapiServer.use(express.json());

  // Set the swagger documentation endpoint
  const specs = swaggerJsdoc(services.swaggerOptions);
  restapiServer.use(
    '/restapi',
    swaggerUi.serve,
    swaggerUi.setup(specs),
  );

  // Add services to the server
  restapiServer.set('services', services);

  // Set the routes
  restapiServer.use('/', restapiRoutes);

  // Start the server
  const port = process.env.RESTAPI_PORT || 3000;
  const restapiServerExec = restapiServer.listen(port, () => {
    console.log(`The server started and listens in ${port}`);
  });

  // Shutdown gracefully
  const shutDown = () => {
    restapiServerExec.close(async () => {
      await services.close();
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);
})();
