import { NextFunction, Request, Response } from "express";
import cyber from "../4-utils/cyber";
import { ForbiddenError } from "../2-models/client-errors";
import { forbidden } from "joi";

async function verifyId(request: Request, response: Response, next: NextFunction) {
    try {
        // Get id from params:
        const id = +request.params.userId;
        

        // Verify that this id is the same as the one inside the token's user.id:
        const isValid = await cyber.verifyId(request, id);

        // If not the same:
        if(!isValid) throw new ForbiddenError("Invalid user id");

        // All is good:
        next();
    }
    catch(err: any) {
        next(err);
    }
    
}

export default verifyId;
