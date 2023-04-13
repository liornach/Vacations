import Joi from "joi";
import RoleModel from "./RoleModel";

class UserModel{

    public userId : number;
    public firstName : string;
    public lastName : string;
    public email : string;
    public userPassword : string;
    public role : RoleModel;

}

export default UserModel;