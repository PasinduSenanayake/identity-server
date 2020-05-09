import EntityManager from '../resource/dbManager';
import ApplicationClient from '../model/applicationClient';
import AuthClient from '../model/authClient'
import DatabaseException from '../exception/databaseException';
import { ApplicationClientCreationFailed, ApplicationClientFetchFailed } from '../exception/exceptionCode';


class ApplicationClientDao {


    async getClientByAttributes(attributesMap) {
        try{
            const response = await EntityManager.getEntity(ApplicationClient).findOne({ 
                where: attributesMap, raw: true });
            return response;
        }catch (error) {
            throw new DatabaseException(ApplicationClientFetchFailed,error);
        }
        
    }

    async getAllClientsByAttributes(attributesMap){
        try{
            const response = await EntityManager.getEntity(ApplicationClient).findAll({ 
                where: attributesMap, raw: true });
            return response;
        }catch (error) {
            throw new DatabaseException(ApplicationClientFetchFailed,error);
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