import ApplicationUserDao from "../dao/applicationUser";
import ApplicationResourceDao from "../dao/applicationResource";
import AuthService from './authentication'

class ApplicationUserService {

    async createUser(authDetails,applicationId) {
        const applicationUser = {
            "applicationId": applicationId,
            "applicationUserIdentifier":authDetails.clientId,
        };
        const authClient = {
            "clientId": authDetails.clientId,
            "clientSecret": authDetails.clientSecretHashed,
            "entityType": authDetails.entityType
        }
        const user = await ApplicationUserDao.createUser(applicationUser,authClient);
        return {
            "applicationUserIdentifier":user.applicationUserIdentifier,
            "applicationUserId":user.applicationUserPrimaryId
        };
    }

    async getUserByUserId(userId,applicationId) {
        const user = await ApplicationUserDao.getUserByAttributes({ "applicationId": applicationId,"applicationUserIdentifier": userId})
        return user;
    }

    async getAllUsersByApplicationId(applicationId) {
        const userList = await ApplicationUserDao.getAllUsersByApplicationId(applicationId);
        return {"applicationUsers":userList};
    }

    async updateUser(userInfo){
        const response = await ApplicationUserDao.updateUser(userInfo);
        return response;
    }

    async generateUserAuthToken(applicationResourceList,userIdentifier,applicationId){
        const user = await ApplicationUserDao.getUserByAttributes({ "applicationId": applicationId,"applicationUserIdentifier": userIdentifier})
        const applicationResources = await ApplicationResourceDao.getApplicationResourcesByAttributes(
            {"applicationId":applicationId,"":user["applicationUserPrimaryId"]});
    
        const tokenList = applicationResources.map(applicationResource=>{return {
            "applicationResourceIdentifier":applicationResource["applicationResourceIdentifier"],
            "applicationResourceId":applicationResource["applicationResourcePrimaryId"],
            "applicationUserIdentifier":userIdentifier,
            "applicationUserId":user["applicationUserPrimaryId"]

        }});
        
        const tokenMap = {}
        let promiseList = []
        if(applicationResourceList[0]==="*"){
            promiseList = tokenList.map(async tokenPayload=>{
                tokenMap[tokenPayload.applicationResourceIdentifier] = await AuthService.createToken(tokenPayload, applicationId, ["user"]);
            });
        }else {
            promiseList = tokenList.map(async tokenPayload=>{
                if(applicationResourceList.includes(tokenPayload.applicationResourceIdentifier)){
                    tokenMap[tokenPayload.applicationResourceIdentifier] = await  AuthService.createToken(tokenPayload, applicationId, ["user"]);
                }
            });
        }
        await Promise.all(promiseList);
        return tokenMap;
    }

}



export default new ApplicationUserService();