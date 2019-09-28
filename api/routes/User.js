
import { Router} from 'express';
import UserService from '../../service/User';
const route = Router();

export default (app) => {
 app.use('/private/users/:userId', route);

 route.get(
   '/',
   async (req,res,next) => {
     try {
      const { user, company } = await UserService.sampleMethod("test");
       return res.status(200).json({ user, company });
     } catch (e) {
       return next(e);
     }
   },
 );
}
