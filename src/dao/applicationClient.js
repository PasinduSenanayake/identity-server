import EntityManager from '../resource/dbManager';
import ApplicationClient from '../model/applicationClient';
import AuthClient from '../model/authClient'
import DatabaseException from '../exception/databaseException';
import { ApplicationClientCreationFailed, ApplicationClientFetchFailed } from '../exception/exceptionCode';


class ApplicationClientDao {


    async getClientByClientId(clientId) {
        try{
            return {}
        }catch (error) {
            throw new DatabaseException(error);
        }
        
    }

    async getAllClients(){
        try{
            return []
        }catch (error) {
            throw new DatabaseException(error);
        }
     
    }

    async createApplicationClient(applicationClientData, authClientData){
        try {
            let applicationClientResponse = {}
            await EntityManager.executeTransaction(async (transaction) => {
                const response = await EntityManager.getEntity(AuthClient).create(authClientData, { transaction: transaction });
                applicationClientResponse = await EntityManager.getEntity(ApplicationClient).create({ 
                    ...applicationClientData, authClientId: response.get()["authClientPrimaryId"] 
                },{ transaction: transaction });
            });
            return applicationClientResponse.get();
        }catch (error) {
            throw new DatabaseException(ApplicationClientCreationFailed,error);
        }
        

    }

    async getApplicationClientByAuthClientId(authClientId){
        try{
            return {"applicationId":"121"}
        }catch (error) {
            
            throw new DatabaseException(ApplicationClientFetchFailed,error);
        }
        
    }


}

export default new ApplicationClientDao();