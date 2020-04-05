import EntityManager from '../resource/dbManager';
import Application from '../model/application';
import AuthClient from '../model/authClient'
class ApplicationDao {


    async getApplicationByApplicationId(applicationId) {
        try {
            const applicationResponse = await EntityManager.getEntity(Application).findOne({ where: { applicationId: applicationId }, raw: true });
            return applicationResponse;
        } catch (error) {
            throw new DatabaseException();
        }

    }

    async createApplication(applicationData, authClientData) {
        try {
            let applicationResponse = {}
            await EntityManager.executeTransaction(async (transaction) => {
                const response = await EntityManager.getEntity(AuthClient).create(authClientData, { transaction: transaction });
                applicationResponse = await EntityManager.getEntity(Application).create({ ...applicationData, authClientId: response.get()["authClientPrimaryId"] },
                    { transaction: transaction });
            });
            return applicationResponse.get();

        } catch (error) {
            throw new DatabaseException();
        }
    }

    async getApplicationByAuthClientId(authClientId) {
        try{
            const applicationResponse = await EntityManager.getEntity(Application).findOne({ where: { authClientId: authClientId }, raw: true });
            return applicationResponse;
        }catch (error) {
            throw new DatabaseException();
        }
        
    }
}

export default new ApplicationDao();