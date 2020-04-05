import AuthenticationService from '../service/authentication'
import {nullCheck, createUnauthenticatedMessage} from "../util/authUtil";
import { InvalidRequestMessage, TokenMissingMessage, CredentialsMissingMessage } from '../util/constant';

export default (authType,audienceList) => {
    return async (req, res, next) => {

        if (authType === "clientCredentials") {
            if(nullCheck(req.headers.clientid)|| nullCheck(req.headers.clientsecret)){
                return next({name: 'UnauthorizedError', status: 401, "message": CredentialsMissingMessage})
            }
            req['authDetails'] = await AuthenticationService.validateClientCredentials(req.headers.clientid, req.headers.clientsecret, req.params.applicationId, audienceList);
        }
        else if (authType === "accessToken"){
            if(nullCheck(req.headers.authorization) ){
                return next({name: 'UnauthorizedError', status: 401, "message": TokenMissingMessage})
            }
            req['authDetails'] = await AuthenticationService.validateToken(req.params.applicationId,req.headers.authorization, audienceList);
        }
    
        if (!req['authDetails']['isAuthenticated']) {
            return next({name: 'UnauthorizedError', status: 401, "message": createUnauthenticatedMessage(authType,req['authDetails']['isInternalError'])})
        }
        else if(!AuthenticationService.isRequestEntityValid(req['authDetails'],req.params)){
            return next({name: 'BadRequestError', status: 400, "message": InvalidRequestMessage})
        }


        return next();
    }
    
}
