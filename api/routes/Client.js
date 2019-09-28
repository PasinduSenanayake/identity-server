
import { Router} from 'express';
import UserService from '../../service/User';
const publicRoute = Router();
const privateRoute = Router();

export default (app) => {
 app.use('/public/', publicRoute);
 app.use('/private/clients/:cliendId', privateRoute);

 publicRoute.get(
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
