import {VacationData, VacationModel} from "../2-models/vacation-model"
import dal from "../4-utils/dal"
import { OkPacket } from "mysql"
import imageHandler from "../4-utils/image-handler";
import { ResourceNotFoundError, ValidationError } from "../2-models/client-errors";

async function getVacations(userId : number): Promise<VacationData[]>{
    // Maybe I would have to add the DISTINCT statement
    const sql = `
        SELECT DISTINCT
            V.*,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacations as V LEFT JOIN followers as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate
    `;

    const vacations : VacationData[]= await dal.execute(sql , [userId]);

    return vacations;
}

async function getOneVacation(vacationId : number) : Promise<VacationModel> {

    // Sql
    const sql = `
    Select * from vacations where vacationId = ?
    `
    // Execute:
    const vacation : VacationModel = await dal.execute(sql , [vacationId]);

    // Return:
    return vacation;
}

async function follow(vacationId : number , userId : number) : Promise<void> {

    // Sql for checking that user is not already following:
    const checkSql = `SELECT * FROM followers WHERE userId = ? AND vacationId = ?`;

    // Execute check:
    const checkResult = await dal.execute(checkSql , [userId , vacationId]);
    
    // If user is already following
    if(checkResult.length > 0 ) throw new ValidationError("You are already following");

    // sql:
    const sql = `INSERT INTO followers (userId ,  vacationId)
                VALUES (? , ?)`;

    // Execute:
    const result : OkPacket = await dal.execute(sql , [userId , vacationId]);

    // Return:
    return;
}

async function unfollow(vacationId :number , userId:number){

    // Sql:
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`

    // Execute:
    const result : OkPacket = await dal.execute(sql , [userId , vacationId]);

    // If now matching was found:
    if(result.affectedRows === 0) throw new ValidationError("You are already not following");

    // Return:
    return;
}



async function addVacation(vacation : VacationModel) : Promise<VacationModel> {

    // Validation:
    vacation.validatePost();

    let imageName = null;

    // If we have an image:
    if (vacation.image) {
        // Save image::
        imageName = await imageHandler.saveImage(vacation.image);

        // Set image name
        vacation.imageName = imageName;
    }
    
    // Create query:
    const sql =`
    INSERT INTO vacations(destination , description , startDate , endDate , price , imageName)
        VALUES(? , ? , ? , ? , ? , ?)
    `;

    // Execute:
    const result : OkPacket = await dal.execute(sql ,[vacation.destination , vacation.description , vacation.startDate , vacation.endDate, vacation.price, vacation.imageName]);

    // Set new id (created by database):
    vacation.vacationId = result.insertId;

    // Remove image file from returned vacation::
    delete vacation.image;

    // Return:
    return vacation;
}

// Update vacation:
async function updateVacation(vacation : VacationModel) : Promise<VacationModel> {

    // Validation
    vacation.validatePut();

    // Take original image name:
    let imageName = await getVacationImageName(vacation.vacationId);

    // If we have an image to update:
    if(vacation.image) {
        // Update image:
        imageName = await imageHandler.updateImage(vacation.image , imageName);
    }

    // Set back image name:
    vacation.imageName = imageName;

    // Create query
    const sql = `
    UPDATE vacations SET
    destination =?,
    description =?,
    startDate =?,
    endDate =?,
    price =?,
    imageName =?
    WHERE vacationId =?
    `

    // Execute:
    const result : OkPacket = await dal.execute(sql,[vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId]);

    // If vacation not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Remove image file from returned vacation:
    delete vacation.image;

    // Return:
    return vacation;
}

// Delete vacation::
async function deleteVacation(vacationId : number) : Promise<void> {
    // Take original image name:
    let imageName = await getVacationImageName(vacationId);

    // Create query:
    const sql = `DELETE FROM vacations WHERE vacationId =?`

    // Execute:
    const result : OkPacket = await dal.execute(sql,[vacationId]);

    // If vacation not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

    // Delete image from disk:
    await imageHandler.deleteImage(imageName);

    return;
}

// Get vacation image name from db:
async function getVacationImageName(vacationId : number) : Promise<string> {

    // Create query:
    const sql=`SELECT imageName FROM vacations WHERE vacationId =?`;

    // Execute (returns an array)
    const imageNameArray = await dal.execute(sql ,[vacationId]);

    // Extract first image:
    const firstImageName = imageNameArray[0];
    
    // If id not found:
    if(!firstImageName) return null;

    // Get image name:
    const imageName = firstImageName.imageName;

    // Return:
    return imageName;
}




export default {
    getVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    follow,
    unfollow,
    getOneVacation
}