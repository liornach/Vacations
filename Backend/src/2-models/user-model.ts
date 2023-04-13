import Joi from "joi";
import RoleModel from "./role-model";
import { ValidationError } from "./client-errors";
import { error } from "console";

class UserModel{

    public userId : number;
    public firstName : string;
    public lastName : string;
    public email : string;
    public userPassword : string;
    public role : RoleModel;

    public constructor(user : UserModel){
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.userPassword = user.userPassword;
        this.role = user.role;
    }

    public static validationSchema = Joi.object({
        userId : Joi.number().forbidden().integer().positive(),
        firstName : Joi.string().required().min(2).max(30),
        lastName : Joi.string().required().min(2).max(40),
        email : Joi.string().required().email().min(2).max(40),
        userPassword : Joi.string().required().min(4).max(256),
        role : Joi.number().forbidden().integer().min(1).max(2)
    });

    public validate() : void {
        const result = UserModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }
}

export default UserModel;