import { Router } from 'express';
import userRouter from './routes/User';
import clientRouter from './routes/Client';
import applicationRouter from './routes/Application'

// guaranteed to get dependencies
export default () => {
	const router = Router();
	clientRouter(router);
	userRouter(router);
	applicationRouter(router)
	return router
}
