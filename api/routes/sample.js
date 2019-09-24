
import { Router} from 'express';
import SampleService from '../../service/Sample';
const route = Router();

export default (app) => {
 app.use('/type', route);

 route.get(
   '/func',
   async (req, res,next) => {
     try {
      const { user, company } = await SampleService.sampleMethod("test");
       return res.status(200).json({ user, company });
     } catch (e) {
       return next(e);
     }
   },
 );
}
