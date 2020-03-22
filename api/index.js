import { Router } from 'express';
import UserRouter from './routes/user';
import ApplicationClientRouter from './routes/applicationClient';
import ApplicationRouter from './routes/application'

// guaranteed to get dependencies
export default () => {

	const router = Router();

	router.use("/applications/:applicationId/clients",ApplicationClientRouter());
	router.use("/applications/:applicationId/users",UserRouter());
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
POST v1/identity/applications/:applicationId/clients -> application

POST v1/identity/applications/:applicationId/users -> application
POST v1/identity/applications/:applicationId/users/:userId/authorize -> user
GET v1/identity/applications/:applicationId/users/:userId/generate-oauth-token -> client
GET v1/identity/applications/:applicationId/users/:userId -> user */
