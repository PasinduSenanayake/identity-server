import {hashSync} from 'bcrypt'
import salt from '../config'

export default class AuthService {
  static async createToken(props) {
    try{
      //const token = jwt.sign({ foo: 'bar' }, cert, { algorithm:'RS256'});
      const token = "implement jwt here"
      return token;
    }
    catch (error){
      console.log(error);
    }
  }
// w

  static async validateToken(props) {
    return {'isAuthRequired':true,'isAuthenticated':true, 'clams':{}}
  }

  static async createCredentials(){
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const secretUUID =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const secret = hashSync(secretUUID, salt);
    return {"id":id,"secret": secret}
  }
}
