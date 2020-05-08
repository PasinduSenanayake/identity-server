import ApplicationResourceDao from "../dao/applicationResource";
import AuthService from './authentication';

class ApplicationResourceService {

    async createApplicationResource(applicationResourceData, applicationId) {

        const response = await ApplicationResourceDao.createApplicationResource({
            ...applicationResourceData,
            applicationId: applicationId
        });
        return response["applicationResourcePrimaryId"]
    }
    async createApplicationResourceUsers(applicationResourceUsers, applicationResourceId,applicationId) {

        const applicationResourceUserList = applicationResourceUsers.map(applicationResourceUser => {
            return {
                applicationUserPrimaryId:applicationResourceUser.applicationUserId,
                applicationResourcePrimaryId: applicationResourceId,
                userClaims: JSON.stringify(applicationResourceUser.userClaims),
                applicationId:applicationId
             }
        })

        const response = await ApplicationResourceDao.createApplicationResourceUsers(applicationResourceUserList);

        return response.map(data=>{return {
            applicationUserId: data["applicationUserPrimaryId"],
            applicationResourceId:data["applicationResourcePrimaryId"],
            applicationId: data["applicationId"]
        }});
    }

    async getApplicationResourceByApplicationIdAndApplicationResourceIdentifier(applicationId, applicationResourceIdentifier){
        const response = await ApplicationResourceDao.getApplicationResourceByAttributes({
            "applicationId":applicationId,
            "applicationResourceIdentifier":applicationResourceIdentifier
        });
        return response;

    }
    
    async verifyUser(applicationUserData, applicationId){
        const tokenVerificationInfo = await AuthService.validateToken(applicationId,applicationUserData.userToken,["user"]);
 
        if (tokenVerificationInfo.isAuthenticated && 
            applicationUserData.applicationResourceIdentifier === tokenVerificationInfo.entityData.applicationResourceIdentifier && 
            applicationUserData.userIdentifer === tokenVerificationInfo.entityData.applicationUserIdentifier){
                const userId = tokenVerificationInfo.entityData.applicationUserId;
                const resourceId = tokenVerificationInfo.entityData.applicationResourceId
                const userClaims =  await ApplicationResourceDao.getUserClaimsByUserIdResourceIdAndApplicationId(userId,resourceId,applicationId);
                return {
                    isVerified:true,
                    userIdentifier:tokenVerificationInfo.entityData.userIdentifer,
                    userClaims: JSON.parse(userClaims)
                };
            }

        return {isVerified:true}
    }



    async getApplicationResourceById(applicationResourceId) {
        const resource = await ApplicationResourceDao.getApplicationResourceByApplicationResourceId(
            applicationResourceId);
        return resource;
    }

    async getAllApplicationResourcesByApplicationId(applicationId) {
        const resourceList = await ApplicationResourceDao.getAllApplicationResourcesByApplicationId(applicationId);

        return { "applicationResources": resourceList };
    }

    async updateApplicationResource(applicationResourceData) {
        const response = await UserDao.updateUser(userInfo);
        return response;
    }

}



export default new ApplicationResourceService();