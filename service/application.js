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
        await ApplicationDao.createApplication(application);
    }

    async getApplication(applicationId) {

        const application = await ApplicationDao.getApplication(applicationId);

        delete application["applicationKey"];
        delete application["clientKey"];
        delete application["userKey"];
        return application;


    }


    static async updateApplication(props) {
        return {'isAuthRequired': true, 'isAuthenticated': true, 'clams': {}}
    }

}


export default new ApplicationService();