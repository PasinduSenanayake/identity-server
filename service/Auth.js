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
}
