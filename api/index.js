import { Router } from 'express';
import userRouter from './routes/User';
import clientRouter from './routes/Client';

// guaranteed to get dependencies
export default () => {
	const router = Router();
	clientRouter(router);
	userRouter(router);
	return router
}
