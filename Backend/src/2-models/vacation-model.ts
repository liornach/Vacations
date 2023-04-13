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

    public validatePost() : void {
        const result = VacationModel.postValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public validatePut() : void {
        const result = VacationModel.putValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);        
    }
}

export interface VacationData extends VacationModel{
    isFollowing: boolean;
    followersCount:number;
}

