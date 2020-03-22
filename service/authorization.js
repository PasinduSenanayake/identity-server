class AuthorizationService {

    authorizeUserOauthRequest(tokenData, requestParams){
        const clientId = tokenData["clientId"];
        const userId = requestParams["userId"];
        const applicationId = requestParams["applicationId"];
        const client = ClientDao.getClient(clientId);
        const user = UserDao.getUser(userId);
        return (user["applicationId"] === client["applicationId"] && user["applicationId"] === applicationId)
    }

    authorizeUserTokenRequest(tokenData, requestParams){

        const userId = requestParams["userId"];
        const applicationId = requestParams["applicationId"];
        const user = UserDao.getUser(userId);
        return (tokenData["tokenType"]==="refresh" && user["applicationId"] === applicationId )
    }
    
    authorizeUserDetailsRequest(userId){
        return {"isValidPayload":true, "payload":payload}
    }
}

export default new AuthorizationService();

