import { Router } from 'express';
import ApplicationClientService from '../../service/applicationClient';
import Authorizer from "../../middleware/auth";
import AuthService from "../../service/authentication";



export default () => {

    const applicationClientRouter = new Router({mergeParams: true});

    applicationClientRouter.get('/', Authorizer("accessToken", ["application"]),
        async (req, res, next) => {
            try {
                const clientList = await ApplicationClientService.getAllApplicationClients(applicationId);
                return res.status(200).json(clientList);
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationClientRouter.get('/:clientId', Authorizer("accessToken", ["client", "application"]),
        async (req, res, next) => {
            try {
                const client = await ApplicationClientService.getApplicationClient(clientId);
                return res.status(200).json(client);
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationClientRouter.post('/', Authorizer("accessToken", ["application"]),
        async (req, res, next) => {
            try {
                const authDetails = await AuthService.createAuthClient("client");
                const applicationClientId = await ApplicationClientService.registerApplicationClient(req.params.applicationId,req.body, authDetails);
                return res.status(200).json({
                    "applicationClientId":applicationClientId,
                    "clientId": authDetails["clientId"],
                    "clientSecret": authDetails["clientSecret"]
                });
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationClientRouter.post('/:clientId/authorize', Authorizer("clientCredentials", ["client"]),
        async (req, res, next) => {
            try {
                const authToken = await AuthService.createToken({ "clientId": req.params.clientId }, applicationId, "client");
                return res.status(200).json(authToken);
            } catch (e) {
                return next(e);
            }
        },
    );


    return applicationClientRouter
}
