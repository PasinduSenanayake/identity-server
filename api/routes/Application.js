import {Router} from 'express';
import UserService from '../../service/User';
import AuthService from "../../service/Auth";
import authorizer from '../../auth';


export default () => {

    const applicationRouter = new Router();

    applicationRouter.get('/:application-id', authorizer(true),
        async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("test");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.post('/', authorizer(false),
        async (req, res, next) => {
            try {
                const {id, secret} = await AuthService.createCredentials();
                return res.status(200).json({id, secret});
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.post('/:application-id/generate-auth-token', authorizer(true),
        async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("test");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.post('/:application-id/refresh-auth-token', authorizer(true),
        async (req, res, next) => {
            try {
                const {user, company} = await UserService.sampleMethod("test");
                return res.status(200).json({user, company});
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.delete('/:application-id', authorizer(true),
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
