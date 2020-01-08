import {Router} from 'express';
import UserService from '../../service/User';


export default () => {

    const clientRouter = new Router();

    clientRouter.get('/', async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("testClient");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    clientRouter.post('/', async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("testClient");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    clientRouter.put('/', async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("testClient");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    return clientRouter
}
