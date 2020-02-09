import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './api';
import config from './config';
const app = express();
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());


  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // Load API routes

  app.use(config.api.prefix+"/v1/identity",routes());

  //sample API calls
  //http://localhost:3000/api/v1/private/users/1212121
  //http://localhost:3000/api/v1/public/getClient

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
app.use((err, req, res, next) => {
  /**
   * Handle 401 thrown by express-jwt library
   */
  if (err.name === 'UnauthorizedError'||err.name === 'BadRequestError' ) {
    return res
      .status(err.status)
      .send({ message: err.message })
      .end();
  }
  return next(err);
});

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  app.listen(3000, () =>
    console.log('Example app listening on port: ',config.port),
  );
