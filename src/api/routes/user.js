import {Router} from 'express';
import UserService from '../../service/user';
import Authorizer from "../../middleware/auth";
import AuthService from "../../service/authentication";
import authorizationService from "../../service/authorization";

export default () => {

    const userRouter = new Router();

    userRouter.get('/', Authorizer("accessToken",["application"]),
        async (req, res, next) => {
            try {
                //get all users
                const userList = await UserService.getAllUsers(applicationId);
                return res.status(200).json(userList);
            } catch (e) {
                return next(e);
            }
        },
    );

    userRouter.get('/:userId', Authorizer("accessToken",["user","application"]),
        async (req, res, next) => {
            try {
                //get single user
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

    userRouter.post('/', Authorizer("accessToken","application"),
        async (req, res, next) => {
            try {
                const user = await UserService.registerClient(req.body);
                const payload = {"userId": user["userId"], "tokenType": "refresh"};
                const refreshToken = await AuthService.createToken(payload, applicationId, ["user"]);
                return res.status(200).json(refreshToken);

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
    userRouter.post('/:userId/authorize', Authorizer("accessToken","user"),
        async (req, res, next) => {
            try {

                if (authorizationService.authorizeUserTokenRequest(tokenData, requestParams)) {
                    const payload = {"userId": userId, "tokenType": "authorize"};
                    const authToken = await AuthService.createToken(payload, applicationId, ["user"]);
                    return res.status(200).json(authToken);
                }

                return res.status(403).json({"status": "invalid"});

            } catch (e) {
                return next(e);
            }
        },
    );

    return userRouter;
}
