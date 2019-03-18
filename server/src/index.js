/* global process */
// Require environment variables
import './helpers/config';

import Express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';
import appRoot from 'app-root-path';
import logger from './lib/logger';
import authRoutes from './routes/v1/auth.routes';
import restaurantRoutes from './routes/v1/restaurant.routes';
import orderRoutes from './routes/v1/order.routes';
import messages from './constants/errorMessages';
import swaggerUi from 'swagger-ui-express';

// Constants
const fs = require('fs');
const path = require('path');
const swaggerDoc = require('./lib/api/v1/openapi.json');
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/serapion-server';

// Require passport configuration for authentication
require('./lib/passport');

// Initialize the Express server
const app = new Express();

// Creating a Morgan write stream

const accessLogStream = fs.createWriteStream(path.join(appRoot.path, '/logs/access.log'), { flags: 'a' });

// Mongo DB Connection

mongoose.promise = Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(
    () => {
      logger.info('Successfully connected to mongoDB');
    },
  )
  .catch(err => {
    logger.error('Connection to MongoDB could not be established');
  });

// Instantiate Express plugins and modules
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: false,
}));
app.use(passport.initialize());
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));

// Disable default X-powered-by header for security/bandwidth purposes.
app.disable('x-powered-by');

// Api documentation route
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// Listing routes here for V1 api endpoints

const router = Express.Router()
router.use('/auth', authRoutes)
router.use('/restaurant', restaurantRoutes)
router.use('/order', orderRoutes)
app.use('/api/v1', router)

// Handle robots.txt in express, for email confirm browser access.
app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});

// Catch all route declared for unhandled requests

/*app.all('*', (req, res) => {
  logger.error(`Attempted access to following route ${req.path} was intercepted by catch all route!`);
  return res.status(404).json({ message: messages.NOT_FOUND });
});
*/


// Async Error handling middleware. NOTICE: This function has to be at the end of the file, after all other middleware.
app.use(function (err, req, res, next) {
  if (err) {
    logger.error(err);
    return next(err);
  }
  return next();
});

// Handle unhandled rejection, log and display error.
process.on('unhandledRejection', (reason, p) => {
  logger.error(`Unhandled promise rejection at ${p}, reason: ${reason}`);
});

// Starting the server
app.listen(PORT,  (error) => {
  if (!error) {
    logger.info(`Serapion server is running on port: ${PORT}!`);
  }
});
