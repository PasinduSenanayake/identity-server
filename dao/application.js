import EntityManager from '../resource/dbManager';
import Application from '../model/application';
import AuthClient from '../model/authClient'
class ApplicationDao {


    async getApplicationByApplicationId(applicationId) {
       const applicationResponse =  await EntityManager.getEntity(Application).findOne({where:{applicationId:applicationId}, raw:true});
       return applicationResponse;
    }

    async createApplication(applicationData, authClientData) {
        
        let applicationResponse = {}
        await EntityManager.executeTransaction(async (transaction) => {
            const response = await EntityManager.getEntity(AuthClient).create(authClientData, { transaction: transaction });
            applicationResponse = await EntityManager.getEntity(Application).create({ ...applicationData, authClientId: response.get()["authClientPrimaryId"] },
                { transaction: transaction });
        });
        return applicationResponse.get();
    }

    async getApplicationByAuthClientId(authClientId) {
        const applicationResponse = await EntityManager.getEntity(Application).findOne({where:{authClientId:authClientId}, raw:true});
        return applicationResponse;
    }
}

export default new ApplicationDao();