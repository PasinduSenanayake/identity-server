import { Router } from 'express';
import UserRouter from './routes/User';
import ClientRouter from './routes/Client';
import ApplicationRouter from './routes/Application'

// guaranteed to get dependencies
export default () => {

	const router = Router();

	router.use("/applications/:applicationId/clients",ClientRouter());
	router.use("/applications/:applicationId/users",UserRouter());
	router.use("/applications",ApplicationRouter());

	return router
}

/*application-id application-secret
GET v1/identity/applications/:application-id/
POST v1/identity/applications/:applicationId/authorize
POST v1/identity/applications

client-id client-secret
GET v1/identity/applications/:applicationId/clients/:client-id/
POST v1/identity/applications/:applicationId/clients/:client-id/authorize
POST v1/identity/applications/:applicationId/clients

POST v1/identity/applications/:applicationId/users
POST v1/identity/applications/:applicationId/users/:userId/authorize
GET v1/identity/applications/:applicationId/users/:userId/generate-oauth-token
GET v1/identity/applications/:applicationId/users/:userId*/
