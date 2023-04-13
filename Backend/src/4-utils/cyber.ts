import UserModel from "../2-models/user-model";
import jwt , { JsonWebTokenError } from "jsonwebtoken";
import { Request } from "express";
import { ForbiddenError, UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import crypto from "crypto";

const secretKey = "PTF3465###$$RTO9jjrkjmichaeljordain"

// Create new token:
function createToken(user : UserModel) : string {

    // Create container containing the user:
    const container = { user };

    // Create options:
    const options = {expiresIn : "2h"} ;

    // Create token:
    const token = jwt.sign(container , secretKey , options);

    // Return token:
    return token;
}

// Verify token:
async function verifyToken(request : Request) : Promise<boolean> {
    return new Promise<boolean>((resolve , reject)=>{

        // Extract header:
        const header = request.header("authorization");

        // If no header:
        if(!header) {
            console.log("header");
            reject(new UnauthorizedError("Access denied"));
            return;
        }

        // Extract token:
        const token = header.substring(7);

        // If no token:
        if(!token) {
            console.log("token");

            reject(new UnauthorizedError("Access denied"));
            return;
        }

        // Verify token:
        jwt.verify(token , secretKey , err => {

            if(err){
            console.log("token2");

                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // If token is valid:
            resolve(true);
        });
    });
}

// Verify id:
function verifyId(request: Request , id : number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, secretKey, (err: JsonWebTokenError , container : any) => {
                if (err) {
                    resolve(false);
                    return;
                }
                const user : UserModel = container.user;

                //  Verify that given id is same as token id:
                if(user.userId !== id ){
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}

async function verifyAdmin(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        // Extract header:
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            console.log("header2")
            reject(new UnauthorizedError("Access denied"));
            return;
        }

        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            console.log("header3")
            reject(new UnauthorizedError("Access denied"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {

            if (err) {
                reject(new ForbiddenError("Access denied"));
                return;
            }

            // Extract user from token:
            const user = container.user;

            // If user is not admin:
            if (user.role !== RoleModel.Admin) {
                console.log("admin");
                reject(new UnauthorizedError("Access denied"));
                return;
            }

            // If user is admin:
            resolve(true);
        });
    });
}

// Hash password:
function hashPassword(text : string) : string {

    // Salt:
    const salt = "$@*oD1@bb)Bs@";

    // Hash:
    const hashedText = crypto.createHmac("sha512" , salt).update(text).digest("hex");

    // Return:
    return hashedText;
}





export default {
    createToken,
    verifyToken,
    verifyAdmin,
    hashPassword,
    verifyId
};