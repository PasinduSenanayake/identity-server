import {Router} from 'express';
import UserService from '../../service/applicationUser';
import Authorizer from "../../middleware/auth";
import AuthService from "../../service/authentication";
import authorizationService from "../../service/authorization";
import Validator from '../../middleware/requestValidator';

export default () => {

    const userRouter = new Router({mergeParams: true});

    userRouter.get('/', Authorizer("accessToken",["application"]),
        async (req, res, next) => {
            try {
                const userList = await UserService.getAllUsersByApplicationId(req.params.applicationId);
                return res.status(200).json(userList);
            } catch (e) {
                return next(e);
            }
        },
    );

    userRouter.get('/:userId', Authorizer("accessToken",["user","application"]),
        async (req, res, next) => {
            try {

                if (authorizationService.authorizeUserOauthRequest(req.authDetails, req.pathParams)) {
                    const user = await UserService.getUser(userId);
                    return res.status(200).json(user);
                }
                return res.status(403).json({"status": "invalid"});
            } catch (e) {
                return next(e);
            }
        },
    );

    userRouter.patch('/:userId', Authorizer("accessToken",["application"]),
        async (req, res, next) => {
            try {
                //get single user
                if (UserService.updateUser(req.body, req.pathParams)) {
                    const user = await UserService.getUser(userId);
                    return res.status(200).json(user);
                }
                return res.status(403).json({"status": "invalid"});
            } catch (e) {
                return next(e);
            }
        },
    );

    userRouter.post('/', Validator("applicationUser",["attributes","duplication"]), Authorizer("accessToken","application"),
        async (req, res, next) => {
            try {
                const authDetails = await AuthService.generateAuthClient("applicationUser",{
                    "userIdentifier":req.body.userIdentifier, 
                    "userSecret":req.body.userSecret
                });    
                const user = await UserService.createUser(authDetails,req.params.applicationId);
            
                // const payload = {"userIdentifier": user["userIdentifier"], "tokenType": "refresh"};
                // const refreshToken = await AuthService.createToken(payload, applicationId, ["user"]);
                return res.status(200).json(user);

            } catch (e) {
                return next(e);
            }
        },
    );

    // generate oauth token by access token of a client to represent as a user
    userRouter.post('/:userId/generate-oauth-token', Authorizer("accessToken",["client"]),
        async (req, res, next) => {
            try {
                if (authorizationService.authorizeUserOauthRequest(req.authDetails, requestParams)) {
                    const payload = {"userId": userId, "tokenType": "authorize"};
                    const authToken = await AuthService.createToken(payload, applicationId, "user");
                    return res.status(200).json(authToken);
                }

                return res.status(403).json({"status": "invalid"});


            } catch (e) {
                return next(e);
            }
        },
    );

    // generate access token by refresh token given to user
    userRouter.post('/:userId/authorize', Validator("applicationUserAuth",["attributes"]), Authorizer("clientCredentials",["user"]),
        async (req, res, next) => {
            try {

               
            const authTokenMap = await UserService.generateUserAuthToken(req.body.applicationResources,
                req.body.userIdentifier,req.params.applicationId);
            return res.status(200).json(authTokenMap);
                

            } catch (e) {
                return next(e);
            }
        },
    );

    return userRouter;
}
