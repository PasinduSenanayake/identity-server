
import UserService from '../../service/User';
import authorizer from '../../auth';


export default (app) => {
 app.get('/:application-id', authorizer(true),
    async (req,res,next) => {
     try {
      const { user, company } = await UserService.sampleMethod("test");
       return res.status(200).json({ user, company });
     } catch (e) {
       return next(e);
     }
   },
 );

    app.post('/', authorizer(false),
        async (req,res,next) => {
            try {
                const { user, company } = await UserService.sampleMethod("test");
                return res.status(200).json({ user, company });
            } catch (e) {
                return next(e);
            }
        },
    );

    app.put('/:application-id', authorizer(true),
        async (req,res,next) => {
            try {
                const { user, company } = await UserService.sampleMethod("test");
                return res.status(200).json({ user, company });
            } catch (e) {
                return next(e);
            }
        },
    );

    app.delete('/:application-id', authorizer(true),
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
