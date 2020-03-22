import {compareSync, hashSync} from 'bcrypt'
import jwt from 'jsonwebtoken'
import Cryptr from 'cryptr'
import config from '../config'
import AuthDao from "../dao/auth";
import ApplicationDao from "../dao/application"
import ApplicationClientDao from "../dao/applicationClient";
import {generateRandomStringList, nullCheck} from "../util/authUtil";


class AuthService {


    async getTokenSignString(applicationId, audience) {
        const application = await ApplicationDao.getApplicationByApplicationId(applicationId);
        const cryptr = new Cryptr("passPhrase");
        return cryptr.decrypt(application[audience + "Key"]);
    }

   async createToken(payload, applicationId, audience) {
        try {
            const tokenString = await this.getTokenSignString(applicationId, audience)
            return jwt.sign(payload, tokenString, {
                algorithm: 'HS384',
                expiresIn: '1h',
                audience: audience
            });
        } catch (error) {
            console.log(error);
        }
    }

    async validateToken(applicationId, token, audienceList) {
        try {

            const decoded = jwt.decode(token, {complete: true});

            if (nullCheck(decoded) || nullCheck(decoded["payload"]["aud"])) {
                return {'isAuthenticated': false,}
            }
            const audienceData = decoded["payload"]["aud"];

            if (audienceList.includes(audienceData)) {
                const tokenString = await this.getTokenSignString(applicationId, audienceData)
                const data = jwt.verify(token, tokenString, {
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

           
        } catch (error) {
            console.log(error);
        }

        return {'isAuthenticated': false}

    }

    isRequestEntityValid(authenticatedData, params={}) {
        switch (authenticatedData["audience"]) {

            case "application":
                if ({}.hasOwnProperty(params,"clientId") && params["clientId"] !== authenticatedData["entityData"]["clientId"]) {
                    return false;
                }
                break;
            case "client":
                if ({}.hasOwnProperty(params,"clientId") && params["clientId"] !== authenticatedData["entityData"]["clientId"]) {
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

    async createAuthClient(entityType) {
        try{
            const [clientId, secretUUID] = generateRandomStringList(2, true);
            const secret = hashSync(secretUUID, config.salt);

            const authClient = {
                "clientId": clientId,
                "clientSecretHashed": secret,
                "clientSecret": secretUUID,
                "entityType": entityType
            };

            if (entityType === "application") {
                const [applicationKey, clientKey, userKey] = generateRandomStringList(3, true);
                const cryptr = new Cryptr("passPhrase");

                return {
                    ...authClient,
                    "applicationKey": cryptr.encrypt(applicationKey),
                    "clientKey": cryptr.encrypt(clientKey),
                    "userKey": cryptr.encrypt(userKey)
                }
            }
            return authClient;
        }
        catch (e) {
            console.log(e)
        }

    }

    async validateClientCredentials(clientId,secret,applicationId,audienceList) {

        try {
            let entity = {};
            const authClient = await AuthDao.getAuthClientByClientId(clientId);

            for (let audience of audienceList) {
                switch (audience) {
    
                    case "client":
                        entity = await ApplicationClientDao.getApplicationClientByAuthClientId(authClient["authClientPrimaryId"]);
                        break;
        
                    case "application":
                        entity = await ApplicationDao.getApplicationByAuthClientId(authClient["authClientPrimaryId"]);
                        break;
        
                }
                if (entity["applicationId"].toString() === applicationId && compareSync(secret, authClient["clientSecret"])) {
                    return {'isAuthenticated': true, 'audience': audience,"applicationId":applicationId, "entityData": entity}
                }
            }
        }catch(e){
            console.log(e);
        }
        return {'isAuthenticated': false}
    }


}

export default new AuthService();
