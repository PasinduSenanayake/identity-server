
import { Router} from 'express';
import UserService from '../../service/User';


export default (app) => {
 app.get(
   '/',
   async (req, res,next) => {
     try {
      const { user, company } = await UserService.sampleMethod("testClient");
       return res.status(200).json({ user, company });
     } catch (e) {
       return next(e);
     }
   },
 );

    app.post(
        '/',
        async (req, res,next) => {
            try {
                const { user, company } = await UserService.sampleMethod("testClient");
                return res.status(200).json({ user, company });
            } catch (e) {
                return next(e);
            }
        },
    );

    app.put(
        '/',
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
