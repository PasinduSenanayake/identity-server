import EntityManager from '../resource/dbManager';
import DatabaseException from '../exception/databaseException';
import ApplicationResourceUsers from '../model/applicationResourceUser';
import ApplicationResource from '../model/applicationResource';
import { ApplicationResourceCreationFailed,ApplicationResourceFetchFailed } from '../exception/exceptionCode';


class ApplicationResourceDao {


    async getApplicationResourceByApplicationResourceId(resourceId) {
        try{
            const response = await EntityManager.getEntity(ApplicationResource).findOne({ 
                where: { "applicationResourcePrimaryId": resourceId }, raw: true });
            return response;
        }catch (error) {
            throw new DatabaseException(error);
        }
        
    }

    async getApplicationResourceByAttributes(attributesMap) {
        try{
            const response = await EntityManager.getEntity(ApplicationResource).findOne({ 
                where: attributesMap, raw: true });
            return response;
        }catch (error) {
            throw new DatabaseException(error);
        }
        
    }
    async getApplicationResourcesByAttributes(attributesMap) {
        try{
            const response = await EntityManager.getEntity(ApplicationResource).findAll({ 
                where: attributesMap, raw: true });
            return response;
        }catch (error) {
            throw new DatabaseException(error);
        }
        
    }


    async getAllApplicationResourcesByApplicationId(applicationId){
        try{
            const response = await EntityManager.getEntity(ApplicationResource).findAll({ 
                where: { "applicationId": applicationId }, raw: true });
            return response;
        }catch (error) {
            throw new DatabaseException(ApplicationResourceFetchFailed,error);
        }
     
    }

    async createApplicationResource(applicationResourceData){
        try {
            const response = await EntityManager.getEntity(ApplicationResource).create(applicationResourceData);
            return response.get();
            
        }catch (error) {
            throw new DatabaseException(ApplicationResourceCreationFailed,error);
        }
        

    }

    async createApplicationResourceUsers(applicationResourceUserList){
        try {
       
            const response = await EntityManager.getEntity(ApplicationResourceUsers).bulkCreate(applicationResourceUserList, 
                {updateOnDuplicate: ["userClaims", "status"] });
            return response.map(data=>data.get());
            
        }catch (error) {
            console.log(error)
            throw new DatabaseException(ApplicationResourceCreationFailed,error);
        }
        

    }

}

export default new ApplicationResourceDao();