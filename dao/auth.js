import EntityManager from '../resource/dbManager';
import authClient from '../model/authClient';
class AuthDao {


    async getAuthClientByClientId(clientId) {
        const authClientResponse = await EntityManager.getEntity(authClient).findOne({where: {clientId: clientId}, raw:true});
        return authClientResponse;
    }

}

export default new AuthDao();
