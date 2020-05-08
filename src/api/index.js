import { Router } from 'express';
import ApplicationUserRouter from './routes/applicationUser';
import ApplicationResourceRouter from './routes/applicationResource';
import ApplicationClientRouter from './routes/applicationClient';
import ApplicationRouter from './routes/application'

// guaranteed to get dependencies
export default () => {

	const router = Router();

	router.use("/applications/:applicationId/clients",ApplicationClientRouter());
	router.use("/applications/:applicationId/resources",ApplicationResourceRouter());
	router.use("/applications/:applicationId/users",ApplicationUserRouter());
	router.use("/applications",ApplicationRouter());

	return router
}

/*application-id application-secret
GET v1/identity/applications/:application-id/ -> application
POST v1/identity/applications/:applicationId/authorize -> application
POST v1/identity/applications -> no auth

client-id client-secret
GET v1/identity/applications/:applicationId/clients/:clientId/ -> client
POST v1/identity/applications/:applicationId/clients/:clientId/authorize -> client
GET v1/identity/applications/:applicationId/clients/:clientId/generate-user-oauth-token -> client
POST v1/identity/applications/:applicationId/clients -> application

POST v1/identity/applications/:applicationId/resources -> application
GET v1/identity/applications/:applicationId/resources/:resourceId/ -> application
POST v1/identity/applications/:applicationId/resources/:resourceId/addUsers -> application
GET v1/identity/applications/:applicationId/resources/ -> application

POST v1/identity/applications/:applicationId/users -> application
PATCH v1/identity/applications/:applicationId/users/:userId -> application
POST v1/identity/applications/:applicationId/users/:userId/authorize -> user
GET v1/identity/applications/:applicationId/users/:userId -> user */
