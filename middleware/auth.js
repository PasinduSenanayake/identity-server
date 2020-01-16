import AuthService from '../service/Auth'

export default (authType,audience) => {
    return async (req, res, next) => {

        if (authType === "clientCredentials") {
            req['authDetails'] = await AuthService.validateClientCredentials(req.headers.clientId, req.headers.clientSecret, req.params.applicationId);
        }
        else if (authType === "accessToken"){
            req['authDetails'] = await AuthService.validateToken(req.headers.Authorization, audience);
        }
        if (!req['authDetails']['isAuthenticated']) {
            return next({name: 'UnauthorizedError', status: 401, "message": 'Invalid Token'})
        }
        else if(!await AuthService.isEntityAuthorized(req['authDetails'])){
            return next({name: 'UnauthorizedError', status: 401, "message": 'Invalid Token'})
        }


        //req['authDetails']={'isAuthRequired':true,'isAuthenticated':true, 'clams':{}}
        return next();
    }
    
}
