import EntityManager from '../resource/dbManager';
import ApplicationClient from '../model/applicationClient';
import AuthClient from '../model/authClient'


class ApplicationClientDao {


    async getClientByClientId(clientId) {
        return {}
    }

    async getAllClients(){
        return []
    }

    async createApplicationClient(applicationClientData, authClientData){
        let applicationClientResponse = {}
        await EntityManager.executeTransaction(async (transaction) => {
            const response = await EntityManager.getEntity(AuthClient).create(authClientData, { transaction: transaction });
            applicationClientResponse = await EntityManager.getEntity(ApplicationClient).create({ 
                ...applicationClientData, authClientId: response.get()["authClientPrimaryId"] 
            },{ transaction: transaction });
        });
        return applicationClientResponse.get();

    }

    async getApplicationClientByAuthClientId(authClientId){
        return {"applicationId":"121"}
    }


}

export default new ApplicationClientDao();