import EntityManager from '../resource/dbManager';
import AuthClient from '../model/authClient';
class AuthDao {


    async getAuthClientByClientId(clientId) {
        const authClientResponse = await EntityManager.getEntity(AuthClient).findOne({where: {clientId: clientId}, raw:true});
        return authClientResponse;
    }

}

export default new AuthDao();
