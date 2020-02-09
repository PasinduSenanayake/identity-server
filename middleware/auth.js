import AuthenticationService from '../service/authentication'
import {nullCheck} from "../util/authUtil";

export default (authType,audienceList) => {
    return async (req, res, next) => {

        if (authType === "clientCredentials") {
            req['authDetails'] = await AuthenticationService.validateClientCredentials(req.headers.clientid, req.headers.clientsecret, req.params.applicationId, audienceList);
        }
        else if (authType === "accessToken"){
            if(nullCheck(req.headers.authorization) ){
                return next({name: 'UnauthorizedError', status: 401, "message": 'Token Missing'})
            }
            req['authDetails'] = await AuthenticationService.validateToken(req.params.applicationId,req.headers.authorization, audienceList);
        }
        if (!req['authDetails']['isAuthenticated']) {
            return next({name: 'UnauthorizedError', status: 401, "message": (authType==="clientCredentials")?"Invalid Credentials":'Invalid Token'})
        }
        else if(!AuthenticationService.isRequestEntityValid(req['authDetails'])){
            return next({name: 'BadRequestError', status: 400, "message": 'Not a valid request'})
        }

        return next();
    }
    
}
