import DatabaseException from "../exception/databaseException";
import EntityManager from '../resource/dbManager';
import AuthClient from "../model/authClient";
import ApplicationUser from "../model/applicationUser";
import { ApplicationCreationFailed,ApplicationUserFetchFailed } from "../exception/exceptionCode";

class ApplicationUserDao {


  async  getUserByAttributes(attributeMap) {
        try{
            const response = await EntityManager.getEntity(ApplicationUser).findOne({ 
                where: attributeMap, raw: true });
            return response;
        }catch (error) {
            console.log(error)
            throw new DatabaseException(ApplicationUserFetchFailed,error);
        }
        
    }

   async  getAllUsersByApplicationId(applicationId){
        try{
            const response = await EntityManager.getEntity(ApplicationUser).findAll({ 
                where: { "applicationId": applicationId }, raw: true });
            return response;
        }catch (error) {
            throw new DatabaseException(ApplicationUserFetchFailed,error);
        }
    }

    async createUser(applicationUserData,authClientData){
        try {
            
            let applicationUserResponse = {}
            await EntityManager.executeTransaction(async (transaction) => {
                const response = await EntityManager.getEntity(AuthClient).create(authClientData, { transaction: transaction });
                applicationUserResponse = await EntityManager.getEntity(ApplicationUser).create({ ...applicationUserData, authClientId: response.get()["authClientPrimaryId"] },
                    { transaction: transaction });
            });
            return applicationUserResponse.get();
        }catch(error){
            console.log(error)
            throw new DatabaseException(ApplicationCreationFailed,error);
        }

    }

}

export default new ApplicationUserDao();