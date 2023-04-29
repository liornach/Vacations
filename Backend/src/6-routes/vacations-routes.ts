import express , { Request , Response , NextFunction} from 'express';
import verifyLoggedIn from '../3-middleware/verify-logged-in';
import { VacationData, VacationModel } from '../2-models/vacation-model';
import vacationService from '../5-services/vacation-service';
import { UploadedFile } from "express-fileupload";
import imageHandler from '../4-utils/image-handler';
import verifyId from '../3-middleware/verify-id';
import verifyAdmin from '../3-middleware/verify-admin';


const router = express.Router();

// GET http://localhost:4000/api/vacations/:userId
router.get("/vacations/:userId([0-9]+)" ,[verifyLoggedIn , verifyId], async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // Extract user id from request:
        const userId = +request.params.userId;

        // Call service to get vacations:
        const vacations : VacationData[] = await vacationService.getVacations(userId);

        // Response:
        response.json(vacations);

    }
    catch(err:any){
        next(err);
    }
});

// GET http://localhost:4000/api/single-vacation/:vacationId
router.get("/single-vacation/:vacationId([0-9]+)" ,[verifyAdmin], async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // Extract vacation id from parameters:
        const vacationId = +request.params.vacationId;
        
        // Call service:
        const vacation : VacationModel = await vacationService.getOneVacation(vacationId);

        // Response:
        response.json(vacation);

    }
    catch(err:any){
        next(err);
    }
});

// Route for user's "follow":
// POST http://localhost:4000/api/vacations/followers/:vacationId/:userId
router.post("/vacations/follow/:vacationId([0-9]+)/:userId([0-9]+)" ,[verifyLoggedIn , verifyId] , async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // Extract params:
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;

        // Call service to add the user as follower:
        await vacationService.follow(vacationId, userId);

        // Response:
        response.sendStatus(201);
    }
    catch(err:any){
        next(err);
    }
});

// Route for user's "unfollow":
// DELETE http://localhost:4000/unfollow/:vacationId/:userId
router.delete("/vacations/unfollow/:vacationId([0-9]+)/:userId([0-9]+)" ,[verifyLoggedIn , verifyId] , async (request: Request , response : Response , next : NextFunction)=>{
    try{
        // Extract params:
        const vacationId = +request.params.vacationId;
        const userId = +request.params.userId;

        // Call service to remove the user as follower:
        await vacationService.unfollow(vacationId, userId);

        // Response:
        response.sendStatus(204);
    }
    catch(err: any){
        next(err);
    }

});

// POST http://localhost:4000/api/vacations
router.post("/vacations" ,verifyAdmin , async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // Take image if exist:
        request.body.image = request.files?.image;

        // Create vacation-model:
        const vacation = new VacationModel(request.body);

        // Call service:
        const addedVacation = await vacationService.addVacation(vacation);

        // response:
        response.status(201).json(addedVacation);
    }
    catch(err:any){
        next(err);
    }
});

// PUT http://localhost:4000/api/vacations/:id
router.put("/vacations/:id([0-9]+)" ,verifyAdmin , async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // set Vacation's id:
        request.body.vacationId = +request.params.id;

        // Take image if exist:
        request.body.image = request.files?.image;

        // Create new vacation model:
        const vacation = new VacationModel(request.body);

        // Call service to update:
        const updatedVacation = await vacationService.updateVacation(vacation);

        // Response:
        response.json(updatedVacation);
    }
    catch(err:any){
        next(err);
    }
});

// DELETE http://localhost:4000/api/vacations/:id
router.delete("/vacations/:id([0-9]+)" ,verifyAdmin , async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // Extract id:
        const vacationId = +request.params.id;

        // Call service to delete:
        await vacationService.deleteVacation(vacationId);

        // Response:
        response.sendStatus(204);
    }
    catch(err:any){
        next(err);
    }
});

// GET http://localhost:4000/api/vacations/images/:imageName
router.get("/vacations/images/:imageName" , async (request : Request , response : Response , next : NextFunction)=>{
    try{
        // Extract image name:
        const imageName = request.params.imageName;

        // Get image path:
        const imagePath = imageHandler.getImagePath(imageName);

        // Response:
        response.sendFile(imagePath);
    }
    catch(err:any){
        next(err);
    }
});




export default router;