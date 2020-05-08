import EntityManager from '../resource/dbManager';
import AuthClient from '../model/authClient';
import DatabaseException from '../exception/databaseException';
class AuthDao {


    async getAuthClientByClientId(clientId) {
        try{
            const authClientResponse = await EntityManager.getEntity(AuthClient).findOne({where: {clientId: clientId}, raw:true});
            return authClientResponse;
        }catch(error){
            throw new DatabaseException(error);
        }
        
    }

}

export default new AuthDao();
