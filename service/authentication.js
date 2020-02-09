import {compareSync, hashSync} from 'bcrypt'
import jwt from 'jsonwebtoken'
import Cryptr from 'cryptr'
import config from '../config'
import AuthDao from "../dao/auth";
import ApplicationDao from "../dao/application"
import ClientDao from "../dao/client";
import {generateRandomStringList, nullCheck} from "../util/authUtil";


class AuthService {


    getTokenSignString(applicationId, audience) {
        const application = ApplicationDao.getApplication(applicationId);
        const cryptr = new Cryptr("passPhrase");
        return cryptr.decrypt(application[audience + "Key"]);
    }

    createToken(payload, applicationId, audience) {
        try {
            return jwt.sign(payload, this.getTokenSignString(applicationId, audience), {
                algorithm: 'HS384',
                expiresIn: '1h',
                audience: audience
            });
        } catch (error) {
            console.log(error);
        }
    }

    validateToken(applicationId, token, audienceList) {
        try {

            const decoded = jwt.decode(token, {complete: true});

            if (nullCheck(decoded) || nullCheck(decoded["payload"]["aud"])) {
                return {'isAuthenticated': false,}
            }
            const audienceData = decoded["payload"]["aud"];

            if (audienceList.includes(audienceData)) {
                const data = jwt.verify(token, this.getTokenSignString(applicationId, audienceData), {
                    algorithm: 'HS384',
                    audience: audienceData
                });
                return {
                    'isAuthenticated': true,
                    audience: audienceData,
                    "entityData": data,
                    "applicationId": applicationId
                }
            }

            return {'isAuthenticated': false,}

        } catch (error) {
            console.log(error);
        }
    }

    isRequestEntityValid(authenticatedData, params) {
        switch (authenticatedData["audience"]) {

            case "application":
                if (params.contains("clientId") && params["clientId"] !== authenticatedData["entityData"]["clientId"]) {
                    return false;
                }
                break;
            case "client":
                if (params.contains("clientId") && params["clientId"] !== authenticatedData["entityData"]["clientId"]) {
                    return false;
                }
                break;

            case "user":
                if (params["userId"] !== authenticatedData["entityData"]["userId"]) {
                    return false;
                }
                break;
        }

        return true;

    }

    createAuthClient(entityType) {
        try{
            const [clientId, secretUUID] = generateRandomStringList(2, true);
            const secret = hashSync(secretUUID, config.salt);

            const authClient = {
                "entityId": clientId,
                "clientSecret": secret,
                "entityType": entityType
            };

            const authClientEntity = {};
            authClientEntity["authClientId"] = AuthDao.createAuthClient(authClient)["authClientPrimaryId"];

            if (entityType === "application") {
                const [applicationKey, clientKey, userKey] = generateRandomStringList(3, true);
                const cryptr = new Cryptr("passPhrase");

                return {
                    ...authClient,
                    "clientSecret": secretUUID,
                    "applicationKey": cryptr.encrypt(applicationKey),
                    "clientKey": cryptr.encrypt(clientKey),
                    "userKey": cryptr.encrypt(userKey)
                }
            }
            return authClientEntity
        }
        catch (e) {
            console.log(e)
        }

    }

    validateClientCredentials(id, secret,applicationId,audienceList) {

        let entity = {};
        const authClient = AuthDao.getAuthClient(entity["clientId"]);
        switch (audienceList[0]) {

            case "client":
                entity = ClientDao.getClientByAuthClientId(authClient["authClientPrimaryId"]);
                break;

            case "application":
                entity = ApplicationDao.getApplicationByAuthClientId(authClient["authClientPrimaryId"]);
                break;

        }
        if (entity["applicationId"].toString() === applicationId && compareSync(secret, authClient["clientSecret"])) {
            return {'isAuthenticated': true, audience: audienceList[0],"applicationId":applicationId, "entityData": entity}
        }
        return {'isAuthenticated': false}
    }


}

export default new AuthService();
