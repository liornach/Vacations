import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

export class VacationModel {

    public vacationId: number;
    public destination: string;
    public description : string;
    public startDate : string;
    public endDate : string;
    public price : number;
    public imageName : string;
    public image: UploadedFile;
    
    public constructor(vacation : VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

    private static postValidationSchema = Joi.object({
        vacationId : Joi.number().forbidden().positive().integer(),
        destination : Joi.string().required().min(2).max(80),
        description : Joi.string().required().min(0).max(1000),
        startDate : Joi.string().required().max(15),
        endDate : Joi.string().required().max(15),
        price: Joi.number().required().min(0).max(10000),
        imageName : Joi.string(),
        image : Joi.any().optional()
    });

    private static putValidationSchema = Joi.object({
        vacationId : Joi.number().required().positive().integer(),
        destination : Joi.string().required().min(2).max(80),
        description : Joi.string().required().min(0).max(1000),
        startDate : Joi.string().required().max(15),
        endDate : Joi.string().required().max(15),
        price: Joi.number().required().integer().min(0).max(10000),
        imageName : Joi.string(),
        image : Joi.any().optional()
    })

    // Validation for dates:
    private static postDatesValidation(start : string , end : string) : void{

        // If start date has already passed:
        const now = new Date();
        const startDate = new Date(start)
        if(startDate < now) throw new ValidationError("Start date has already been passed!");

        this.putDatesValidation(start, end);
    }

    private static putDatesValidation(start : string , end : string){
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (endDate < startDate) throw new ValidationError("End date cannot be before start date!");

    }

    public validatePost() : void {
        VacationModel.postDatesValidation(this.startDate , this.endDate);
        const result = VacationModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validatePut() : void {
        VacationModel.putDatesValidation(this.startDate , this.endDate);
        const result = VacationModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);        
    }
}

export interface VacationData extends VacationModel{
    isFollowing: boolean;
    followersCount:number;
}


