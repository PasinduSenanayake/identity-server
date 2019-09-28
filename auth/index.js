  import AuthService from '../service/Auth'

  export default (isPrivate) => {
  return async (req, res, next)=>{
       if (req) {
        if(isPrivate){
          req['authDetails']= await AuthService.validateToken(req.headers.authorizer);
          if(!req['authDetails']['isAuthenticated']){
            return next({name:'UnauthorizedError',status:401,"message":'Invalid Authentication Token'})
          }
          //req['authDetails']={'isAuthRequired':true,'isAuthenticated':true, 'clams':{}}
        }else {
          req['authDetails']={'isAuthRequired':false,}
        }
      return  next();
      }
    }
  }
