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
POST v1/identity/applications/:applicationId/generate-auth-token
POST v1/identity/applications/:applicationId/refresh-auth-token
POST v1/identity/applications

client-id client-secret
GET v1/identity/applications/:applicationId/clients/:client-id/
POST v1/identity/applications/:applicationId/clients/:client-id/generate-auth-token
POST v1/identity/applications/:applicationId/clients/:client-id/refresh-auth-token
POST v1/identity/applications/:applicationId/clients

POST v1/identity/applications/:application-id/users
POST v1/identity/applications/:application-id/users/:user-id/refresh-auth-token
POST v1/identity/applications/:application-id/users/:user-id/validate
GET v1/identity/applications/:application-id/users/:user-id/generate-oauth-token
GET v1/identity/applications/:application-id/users/:user-id*/
