import EntityManager from '../resource/dbManager';
import Application from '../model/application';
import AuthClient from '../model/authClient'
import DatabaseException from '../exception/databaseException';
import { ApplicationCreationFailed,ApplicationFetchFailed } from '../exception/exceptionCode';
class ApplicationDao {


    async getApplicationByAttribute(attributeName, attributeValue) {
        try {
            const applicationResponse = await EntityManager.getEntity(Application).findOne({ where: { [attributeName]: attributeValue }, raw: true });
            return applicationResponse;
        } catch (error) {
            throw new DatabaseException(ApplicationFetchFailed,error);
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
            throw new DatabaseException(ApplicationCreationFailed, error);
        }
    }
}

export default new ApplicationDao();