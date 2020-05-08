import {Router} from 'express';
import ApplicationResourceService from "../../service/applicationResource";
import Authorizer from '../../middleware/auth';
import Validator from '../../middleware/requestValidator';


export default () => {

    const applicationResourceRouter = new Router({mergeParams: true});

    applicationResourceRouter.get('/:resourceId', Authorizer("accessToken", ["application"]),
        async (req, res, next) => {
            try {
                const applicationResourceDetails = await ApplicationResourceService.getApplicationResourceById(req.params.resourceId);
                return res.status(200).json(applicationResourceDetails);
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationResourceRouter.get('/', Authorizer("accessToken", ["application"]),
    async (req, res, next) => {
        try {
            const applicationResourceDetails = await ApplicationResourceService.getAllApplicationResourcesByApplicationId(req.params.applicationId);
            return res.status(200).json(applicationResourceDetails);
        } catch (e) {
            return next(e);
        }
    },
);

    applicationResourceRouter.post('/',Validator("applicationResource",["attributes"]), Authorizer("accessToken", ["application"]),
     async (req, res, next) => {
            try {
        
                const applicationResourcePrimaryId = await ApplicationResourceService.createApplicationResource(req.body, req.params.applicationId);
                return res.status(200).json({
                    "applicationResourceId":applicationResourcePrimaryId,
                    "applicationResourceIdentifier":req.body.applicationResourceIdentifier,
                });
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationResourceRouter.patch('/:resourceId/addUsers',Validator("applicationResourceUsers",["attributes","duplication"]), Authorizer("accessToken", ["application"]),
     async (req, res, next) => {
            try {
        
                const response = await ApplicationResourceService.createApplicationResourceUsers(req.body.users, req.params.resourceId, req.params.applicationId);
                return res.status(200).json(response);
            } catch (e) {
                return next(e);
            }
        },
    );

    applicationResourceRouter.post('/verify',Validator("applicationVerifiedUser",["attributes"]),
     async (req, res, next) => {
            try {
        
                const response = await ApplicationResourceService.verifyUser(req.body, req.params.applicationId);
                return res.status(200).json(response);
            } catch (e) {
                return next(e);
            }
        },
    );


    return applicationResourceRouter;
}
