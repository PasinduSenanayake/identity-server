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

    async getApplicationClient(clientId) {
        const applicationClient = await ApplicationClientDao.getClient(clientId);
        return applicationClient;
    }

    async getAllApplicationClients(applicationId) {
        const applicationClientsList = await ApplicationClientDao.getAllClients(applicationId);
        return applicationClientsList;
    }


}


export default new ApplicationClientService();