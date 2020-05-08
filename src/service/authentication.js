import { compareSync, hashSync } from 'bcrypt'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import Cryptr from 'cryptr'
import config from '../config'
import AuthDao from "../dao/auth";
import ApplicationDao from "../dao/application"
import ApplicationClientDao from "../dao/applicationClient";
import ApplicationUserDao from '../dao/applicationUser';
import { generateRandomStringList, nullCheck } from "../util/authUtil";
import AuthenticationException from '../exception/authenticationException';
import { TokenCreationFailed, TokenValidationFailed, 
    RequestValidationFailed, ClientCredentialsValidationFailed } from '../exception/exceptionCode';
import Logger from '../resource/logger';
import AuthorizationException from '../exception/authorizationException';


class AuthService {


    async getTokenSignString(applicationId, audience) {
        const application = await ApplicationDao.getApplicationByAttribute("applicationId",applicationId);
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
            throw new AuthenticationException(TokenCreationFailed, error);
        }
    }

    async validateToken(applicationId, token, audienceList) {
        try {

            const decoded = jwt.decode(token, { complete: true });

            if (nullCheck(decoded) || nullCheck(decoded["payload"]["aud"])) {
                return { 'isAuthenticated': false, }
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
                    'audience': audienceData,
                    'entityData': data,
                    'applicationId': applicationId
                }
            }


        } catch (error) {
            Logger.error("Token validation failed", new AuthorizationException(TokenValidationFailed, error));
            if (error instanceof TokenExpiredError) {
                return { 'isAuthenticated': false }
            }
            return { 'isAuthenticated': false, 'isInternalError': true }
        }
        return { 'isAuthenticated': false }

    }

    isRequestEntityValid(authenticatedData, params = {}) {

        try {
            switch (authenticatedData["audience"]) {

                case "application":
                    if ({}.hasOwnProperty(params, "clientId") && params["clientId"] !== authenticatedData["entityData"]["clientId"]) {
                        return false;
                    }
                    break;
                case "resource":
                    if ({}.hasOwnProperty(params, "resourceId") && params["resourceId"] !== authenticatedData["entityData"]["resourceId"]) {
                        return false;
                    }
                    break;    
                case "client":
                    if ({}.hasOwnProperty(params, "clientId") && params["clientId"] !== authenticatedData["entityData"]["clientId"]) {
                        return false;
                    }
                    break;

                case "user":
                    if ({}.hasOwnProperty(params, "userId") && params["userId"] !== authenticatedData["entityData"]["applicationUserPrimaryId"]) {
                        return false;
                    }
                    break;
            }

            return true;
        } catch (error) {
            Logger.error("Request entity validation failed", new AuthorizationException(RequestValidationFailed, error));
        }
        return false;

    }

    async generateAuthClient(entityType,authInfo={}) {

        const authClient = {}
        switch (entityType){
            case "application":
            case "applicationClient":
                const [clientGeneratedId, secretUUID] = generateRandomStringList(2, true);
                authClient["clientId"] = clientGeneratedId;
                authClient["clientSecretHashed"] = hashSync(secretUUID, config.salt);
                authClient["clientSecret"] = secretUUID;
                authClient["entityType"] = entityType;
                break;
            case "applicationUser":
                authClient["clientId"] = authInfo["userIdentifier"]
                authClient["clientSecretHashed"] = hashSync(authInfo["userSecret"], config.salt);
                authClient["entityType"] = entityType;
                break;
        }

    
        switch (entityType){
            case "application":
                const [applicationKey, clientKey, userKey] = generateRandomStringList(4, true);
                const cryptr = new Cryptr("passPhrase");

                return {
                    ...authClient,
                    "applicationKey": cryptr.encrypt(applicationKey),
                    "clientKey": cryptr.encrypt(clientKey),
                    "userKey": cryptr.encrypt(userKey)
                    }

            
            case "applicationUser":
            case "applicationClient":    
                return authClient
            
            default:   
                return authClient;
        }
     

    }

    async validateClientCredentials(clientId, secret, applicationId, audienceList) {

        try {
            let entity = {};
            const authClient = await AuthDao.getAuthClientByClientId(clientId);

            for (let audience of audienceList) {
                switch (audience) {

                    case "client":
                        entity = await ApplicationClientDao.getApplicationClientByAuthClientId(authClient["authClientPrimaryId"]);
                        break;

                    case "application":
                        entity = await ApplicationDao.getApplicationByAttribute("authClientId",authClient["authClientPrimaryId"]);
                        break;

                    case "user":
                        entity = await ApplicationUserDao.getUserByAttributes({"authClientId":authClient["authClientPrimaryId"]});
                        break;    

                }
                if (entity["applicationId"].toString() === applicationId && compareSync(secret, authClient["clientSecret"])) {
                    return { 'isAuthenticated': true, 'audience': audience, "applicationId": applicationId, "entityData": entity }
                }
            }
        } catch (error) {
            Logger.error("Client credential validation failed", new AuthorizationException(ClientCredentialsValidationFailed, error));
            return { 'isAuthenticated': false, 'isInternalError': true }
        }
        return { 'isAuthenticated': false }
    }


}

export default new AuthService();
