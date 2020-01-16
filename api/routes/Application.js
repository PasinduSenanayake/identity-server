import {Router} from 'express';
import UserService from '../../service/User';
import AuthService from "../../service/Auth";
import Authorizer from '../../middleware/auth';


export default () => {

    const applicationRouter = new Router();

    applicationRouter.get('/:application-id', Authorizer("accessToken"),
        async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("test");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.post('/', async (req, res, next) => {
            try {
                const {id, secret} =  AuthService.createAuthClient();
                return res.status(200).json({id, secret});
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.post('/:application-id/authorize', Authorizer("clientCredentials"),
        async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("test");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );


    applicationRouter.delete('/:application-id', Authorizer("accessToken"),
        async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("test");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    return applicationRouter;
}
