import {Router} from 'express';
import ApplicationService from "../../service/application";
import AuthenticationService from "../../service/authentication";
import Authorizer from '../../middleware/auth';


export default () => {

    const applicationRouter = new Router({mergeParams: true});

    applicationRouter.get('/:applicationId', Authorizer("accessToken", ["application"]),
        async (req, res, next) => {
            try {
                const applicationDetails = await ApplicationService.getApplication(req.params.applicationId);
                return res.status(200).json(applicationDetails);
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationRouter.post('/', async (req, res, next) => {
            try {
                const authDetails = await AuthenticationService.createAuthClient("application");
                const applicationId = await ApplicationService.registerApplication(req.body, authDetails);
                return res.status(200).json({
                    "applicationId":applicationId,
                    "clientId": authDetails["clientId"],
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
