import ApplicationDao from "../dao/application";

class ApplicationService {

    async registerApplication(applicationDetails, authDetails) {
        const application = {
            "applicationName": applicationDetails.applicationName,
            "authClientId": authDetails.authClientPrimaryId,
            "applicationKey": authDetails.applicationKey,
            "clientKey": authDetails.clientKey,
            "userKey": authDetails.userKey
        };
        const authClient = {
            "clientId": authDetails.clientId,
            "clientSecret": authDetails.clientSecretHashed,
            "entityType": authDetails.entityType
        }
        const applicationData = await ApplicationDao.createApplication(application, authClient);
        return applicationData.applicationId;
    }

    async getApplication(applicationId) {

        const application = await ApplicationDao.getApplicationByApplicationId(applicationId);

        delete application["applicationKey"];
        delete application["clientKey"];
        delete application["userKey"];
        return application;


    }


    static async updateApplication(props) {
        return { 'isAuthRequired': true, 'isAuthenticated': true, 'clams': {} }
    }

}


export default new ApplicationService();