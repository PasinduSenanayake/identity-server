import {Router} from 'express';
import ApplicationService from "../../service/application";
import AuthenticationService from "../../service/authentication";
import Authorizer from '../../middleware/auth';
import authorizationService from "../../service/authorization";


export default () => {

    const applicationRouter = new Router({mergeParams: true});

    applicationRouter.get('/:applicationId', Authorizer("accessToken", ["application"]),
        async (req, res, next) => {
            try {
                const applicationDetails = await ApplicationService.getApplication(applicationId);
                return res.status(200).json(applicationDetails);
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.post('/', async (req, res, next) => {
            try {
                const authDetails = await AuthenticationService.createAuthClient("application");
                await ApplicationService.registerApplication(req.body, authDetails);
                return res.status(200).json({
                    "clientId": authDetails["entityId"],
                    "clientSecret": authDetails["clientSecret"]
                });
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.post('/:applicationId/authorize', Authorizer("clientCredentials",["application"]),
        async (req, res, next) => {
            try {
                const payload = {"applicationId": req["authDetails"]["applicationId"]};
                const authToken = await AuthenticationService.createToken(payload, req["authDetails"]["applicationId"], "application");
                return res.status(200).json({"authToken":authToken});

            } catch (e) {
                return next(e);
            }
        },
    );


    return applicationRouter;
}
