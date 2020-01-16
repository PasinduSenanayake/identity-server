import {hashSync, compareSync} from 'bcrypt'
import jwt from 'jsonwebtoken'
import Cryptr from 'cryptr'
import salt from '../config'
import AuthDao from "../dao/auth";
import {generateRandomStringList} from "../util/authUtil";


class AuthService {


    createToken(payload, applicationId, audience) {
        try {
            const cryptr = new Cryptr(applicationId + "passPhrase");
            const authClient = AuthDao.getAuthClient(applicationId);


            const secureString = cryptr.decrypt(authClient.getAudeinceString());
            return jwt.sign(payload, secureString, {algorithm: 'RS256', expiresIn: '1h', audience: audience});
        } catch (error) {
            console.log(error);
        }
    }

    validateToken(applicationId, token, audience) {
        try {
            const cryptr = new Cryptr(applicationId + "passPhrase");

            const application = AuthDao.getAuthClient(applicationId);
            const secureString = cryptr.decrypt(application.get(audience + "key"));

            const data = jwt.verify(token, secureString, {algorithm: 'RS256', audience: audience});
            console.log(data);
            return {'isAuthenticated': true, audience: "test", "entityId": "", "applicationId": ""}
        } catch (error) {
            console.log(error);
        }
    }

    isEntityAuthorized(authenticatedData) {
        const entityData = {};
        switch (authenticatedData["audience"]) {
            case "Client":
                entityData["clientId"] = ""
                break;
            case "Application":
                entityData["applicationId"] = ""
                break;
            case "User":
                entityData["userId"] = ""
                break;
        }

        return AuthDao.getEntity(entityData);

    }

    createAuthClient(entityType) {

        const {clientId, secretUUID} = generateRandomStringList(2, true);
        const secret = hashSync(secretUUID, salt);
        const authClient = {
            "entityId": clientId,
            "clientSecret": secret,
            "entityType": entityType
        };
        AuthDao.createAuthClient(authClient);

        if (entityType === "application") {
            const {applicationKey, clientKey, userKey} = generateRandomStringList(3, true);
            const cryptr = new Cryptr(id + "passPhrase");

            return {
                ...authClient,
                "applicationKey": cryptr.encrypt(applicationKey),
                "clientKey": cryptr.encrypt(clientKey),
                "userKey": cryptr.encrypt(userKey)
            }
        }

        return {...authClient}
    }

    validateClientCredentials(id, secret) {
        const authClient = AuthDao.getAuthClient(id);
        return compareSync(secret, authClient.getSecret())
    }


}

export default new AuthService();
