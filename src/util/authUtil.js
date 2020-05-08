import { InvalidClientCredentialMessage, InValidTokenMessage, 
    InvalidOrErrorTokenMessage, InvalidOrErrorClientCredentialMessage } from "./constant";

export const generateRandomStringList = (listLength, isSpread = false)=>{

    const randomStringList  = [];
    for(let i =0; i<listLength; i++){
        randomStringList.push( Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    }

    return (isSpread)?[...randomStringList]:randomStringList;

};

export const nullCheck = (data)=> (data===null ||typeof data ==="undefined");

export const createUnauthenticatedMessage = (authType,isInternalError) =>{
    if(!isInternalError){
        return (authType === "clientCredentials")?InvalidClientCredentialMessage:InValidTokenMessage;
    }
    return (authType === "clientCredentials")?InvalidOrErrorClientCredentialMessage:InvalidOrErrorTokenMessage;
}

export const isJson = (jsonObj)=>{
    try {
        JSON.stringify(jsonObj);
        return true;
    }catch(e){
        return false;
    }
}



