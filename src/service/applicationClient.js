import ApplicationClientDao from "../dao/applicationClient";

class ApplicationClientService {

    async registerApplicationClient(applicationId, clientDetails, authDetails) {
        const applicationClient = {
            "applicationId": applicationId,
            "applicationClientIdentifier":clientDetails.applicationClientIdentifier
        };
        const authClient = {
            "clientId": authDetails.clientId,
            "clientSecret": authDetails.clientSecretHashed,
            "entityType": authDetails.entityType
        }
        const applicationClientResponse = await ApplicationClientDao.createApplicationClient(applicationClient,authClient);
        return applicationClientResponse.applicationClientPrimaryId
    }

    async createApplicationClientUsers(applicationClientUsers, applicationClientId,applicationId) {

        const applicationClientUserList = applicationClientUsers.map(applicationClientUser => {
            return {
                applicationUserPrimaryId:applicationClientUser.applicationUserId,
                applicationClientPrimaryId: applicationClientId,
                applicationId:applicationId
             }
        })

        const response = await ApplicationClientDao.createApplicationClientUsers(applicationClientUserList);

        return response.map(data=>{return {
            applicationUserId: data["applicationUserPrimaryId"],
            applicationClientId:data["applicationClientPrimaryId"],
            applicationId: data["applicationId"]
        }});
    }

    async getApplicationClientIdAndApplicationId(clientId,applicationId) {
        const applicationClient = await ApplicationClientDao.getClientByAttributes({"applicationId":applicationId,
        "applicationClientPrimaryId":clientId});
        return applicationClient;
    }

    async getAllApplicationClientsByApplicationId(applicationId) {
        const applicationClientsList = await ApplicationClientDao.getClientsByAttributes({"applicationId":applicationId});
        return applicationClientsList;
    }


}


export default new ApplicationClientService();