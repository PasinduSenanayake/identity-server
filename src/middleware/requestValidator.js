import ApplicationService from "../service/application";
import ApplicationUserService from "../service/applicationUser";
import applicationResourceService from "../service/applicationResource";
import { isJson } from "../util/authUtil";

export default (entity,validationList) => {
    return async (req, res, next) => {
        let validationResponse;
        switch (entity){

            case "application":
                validationResponse = await validateApplicationRequest(validationList,req);
                break;
            case "applicationClient" :
                validationResponse = await validateApplicationClientRequest(validationList,req);
                break;
            case "applicationResource" :
                validationResponse = await validateApplicationResourceRequest(validationList,req);
                break;   
            case "applicationUser" :
                validationResponse = await validateApplicationUserRequest(validationList,req);
                break; 
            case "applicationResourceUsers" :
                validationResponse = await validateApplicationUserResourcesRequest(validationList,req);
                break;
            case "applicationUserAuth":
                validationResponse = await validateApplicationUserAuthRequest(validationList,req);
                break;   
            case "applicationVerifiedUser":
                validationResponse = await validateApplicationVerifiedUserRequest(validationList,req);
                break;          
            default:
                validationResponse = {isValid:false, validationError:"Unknown Error"}

        }

        if (!validationResponse.isValid) {
            return next({name: 'BadRequestError', status: 400, "message": validationResponse.validationError})
        }

        return next();
    }
    
}


const validateApplicationRequest = async (validationList,req)=>{

    for (let validation of validationList){
        switch(validation){
            case "attributes":
                
                if (!req.body.applicationName){
                    return {isValid:false, validationError:"Application Name is required"}
                }
                break;
                
            case "duplication":
                const application = await ApplicationService.getApplicationByApplicationName(req.body.applicationName);
                if(application){
                    return {isValid:false, validationError:"Application Name is already in use"}
                }
                break;
            default:
                return {isValid:false, validationError:"Unknown Error"}   
        }
        
    }
    return {isValid:true, validationError:""}
}
const validateApplicationVerifiedUserRequest = async (validationList,req)=>{

   for (let validation of validationList){
        switch(validation){
            case "attributes":
                
                if (!req.body.userToken){
                    return {isValid:false, validationError:"UserToken is required"}
                }
                if(!req.body.userIdentifier){
                    return {isValid:false, validationError:"UserIdentifer is required"}
                }

                if(!req.body.applicationResourceIdentifier){
                    return {isValid:false, validationError:"applicationResourceIdentifier is required"}
                }
                break;
          
            default:
                return {isValid:false, validationError:"Unknown Error"}   
        }
        
    }
}
const validateApplicationClientRequest = async (validationList,req)=>{
    return {isValid:true, validationError:""} 
}

const validateApplicationUserAuthRequest = async (validationList,req)=>{
    for (let validation of validationList){
        switch(validation){
            case "attributes":
                
                if (!req.body.applicationResources){
                    return {isValid:false, validationError:"Application Resources are required"}
                }

                if(!Array.isArray(req.body.applicationResources)){
                    return {isValid:false, validationError:"Application Resources should be a list"}
                }

                if(!req.body.userIdentifier){
                    return {isValid:false, validationError:"UserIdentifer is required"}
                }
                break;
          
            default:
                return {isValid:false, validationError:"Unknown Error"}   
        }
        
    }

    return {isValid:true, validationError:""}
}

const validateApplicationResourceRequest = async (validationList,req)=>{
    for (let validation of validationList){
        switch(validation){
            case "attributes":
                
                if (!req.body.applicationResourceIdentifier){
                    return {isValid:false, validationError:"Application Resource Identifier is required"}
                }
                break;
            case "duplication":
               const applicationResource = await applicationResourceService.getApplicationResourceByApplicationIdAndApplicationResourceIdentifier(
                   req.params.applicationId,req.body.applicationResourceIdentifier)
                if (applicationResource){
                        return {isValid:false, validationError:"Application Resource Identifier already exists"}
                }
                break;
            default:
                return {isValid:false, validationError:"Unknown Error"}   
        }
        
    }

    return {isValid:true, validationError:""}
}


const validateApplicationUserRequest = async (validationList,req)=>{
    for (let validation of validationList){
        switch(validation){
            case "attributes":
                if (!req.body.userIdentifier){
                    return {isValid:false, validationError:"UserIdentifier is required"}
                }
                break;

                case "duplication":
                    const applicationUser = await ApplicationUserService.getUserByUserId(req.body.userIdentifier,req.params.applicationId);
                    if(applicationUser){
                        return {isValid:false, validationError:"User Identifier is already in use"}
                    }
                    break;    
            
            default:
                return {isValid:false, validationError:"Unknown Error"}   
        }
        
    }

    return {isValid:true, validationError:""}
}

const validateApplicationUserResourcesRequest = async (validationList,req)=>{
    const userIdList = []
    if(!Array.isArray(req.body.users)){
        return {isValid:false, validationError:"Users must be a list"}
    }
    for (const [index,request] in req.body.users.entries()){
        for (let validation of validationList){
            switch(validation){
                case "attributes":
                    
                    if (!request.applicationUserId){
                        return {isValid:false, validationError:`applicationUserId is required in ${index} object`}
                    }
                    const applicationUser = await ApplicationUserService.getUserByUserId(request.userIdentifier,req.params.applicationId);
                    if(!applicationUser){
                        return {isValid:false, validationError:`applicationUserId ${request.userId} is not valid`}
                    }
                    if (!request.userClaims){
                        return {isValid:false, validationError:`userClaims are required in ${index} object`}
                    }
                    if(!isJson(request.userClaims)){
                        return {isValid:false, validationError:`userClaims must be a json in ${index} object`}
                    }
                   
                    break;
    
                    case "duplication":
                        if(userIdList.includes(request.userId)){
                            return {isValid:false, validationError:`User Id ${request.userId} is duplicated`}
                        }
                        userIdList.push(request.userId);
                        break;    
                
                default:
                    return {isValid:false, validationError:"Unknown Error"}   
            }
            
        }
    }


    return {isValid:true, validationError:""}
}