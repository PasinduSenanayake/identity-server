import {Router} from 'express';
import ClientService from '../../service/client';
import Authorizer from "../../middleware/auth";
import AuthService from "../../service/authentication";
import authorizationService from "../../service/authorization";



export default () => {

    const clientRouter = new Router();

    clientRouter.get('/', Authorizer("accessToken",["application"]),
        async (req, res, next) => {
            try {
                const clientList = await ClientService.getAllClients(applicationId);
                return res.status(200).json(clientList);
            } catch (e) {
                return next(e);
            }
        },
    );

    clientRouter.get('/:clientId', Authorizer("accessToken",["client","application"]),
        async (req, res, next) => {
            try {
                const client = await ClientService.getClient(clientId);
                return res.status(200).json(client);
            } catch (e) {
                return next(e);
            }
        },
    );

    clientRouter.post('/', Authorizer("accessToken",["application"]),
        async (req, res, next) => {
            try {
                const authDetails =  await AuthService.createAuthClient();
                await ClientService.registerClient(req.body,authDetails);
                return res.status(200).json({ "clientId":authDetails["id"], "clientSecret":authDetails["secret"]});
            } catch (e) {
                return next(e);
            }
        },
    );

    clientRouter.post('/:clientId/authorize', Authorizer("clientCredentials"),
        async (req, res, next) => {
            try {
                if(authorizationService.authorizeClientTokenRequest(tokenData)){
                    const payload = {"clientId":clientId};
                    const authToken =  await AuthService.createToken(payload, applicationId,"client");
                    return res.status(200).json(authToken);
                }else {
                    return res.status(400).json({"status":"invalid"});
                }
            } catch (e) {
                return next(e);
            }
        },
    );


    return clientRouter
}
