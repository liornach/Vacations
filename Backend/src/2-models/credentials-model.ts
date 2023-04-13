import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email : string;
    public userPassword : string;

    public constructor(credentials : CredentialsModel){
        this.email = credentials.email;
        this.userPassword = credentials.userPassword;
    }

    private static validationSchema = Joi.object({
        email : Joi.string().email().required().min(1).max(40),
        userPassword : Joi.string().required().min(4).max(40)
    })

    // Validate credentials:
    public validate() : void {
        const result = CredentialsModel.validationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;