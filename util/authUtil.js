export const generateRandomStringList = (listLength, isSpread = false)=>{

    const randomStringList  = [];
    for(let i =0; i<listLength; i++){
        randomStringList.push( Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    }

    return (isSpread)?{...randomStringList}:randomStringList;

}