import { Router } from 'express';
import sample from './routes/sample';

// guaranteed to get dependencies
export default () => {
	const router = Router();
	sample(router);
	return router
}
