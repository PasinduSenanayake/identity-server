
import { Router} from 'express';
import UserService from '../../service/User';
const route = Router();

export default (app) => {
 app.use('/public/', route);
 app.use('/private/clients/:cliendId', route);

 route.get(
   '/getClient',
   async (req, res,next) => {
     try {
      const { user, company } = await UserService.sampleMethod("testClient");
       return res.status(200).json({ user, company });
     } catch (e) {
       return next(e);
     }
   },
 );
}
