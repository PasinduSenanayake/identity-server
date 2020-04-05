
class DatabaseException {

    constructor(errorMeta,error){
        let e = new Error(`: code:${errorMeta.errorCode} message:${errorMeta.errorMessage}`)
        e.original = error
        e.stack = e.stack.split('\n').slice(0,2).join('\n') + '\n' + error.stack
        return e;
    }
}

export default DatabaseException