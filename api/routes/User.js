import {Router} from 'express';
import UserService from '../../service/User';

export default () => {

    const userRouter = new Router();

    userRouter.get('/', async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("test");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    return userRouter;
}
