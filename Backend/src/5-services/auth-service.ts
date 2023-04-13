import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";
import UserModel from "../2-models/user-model";
import dal from "../4-utils/dal";
import cyber from "../4-utils/cyber";
import CredentialsModel from "../2-models/credentials-model";


// Register new user:
async function register(user : UserModel) : Promise<string> {

    // Validate user:
    user.validate();


    // Check if email is taken:
    const isTaken = await isEmailTaken(user.email);
    if(isTaken) throw new ValidationError(`Email ${user.email} already taken`);

    // Hash password:
    user.userPassword = cyber.hashPassword(user.userPassword);

    // Set role as a regular user:
    user.role = RoleModel.User;

    // Create query:
    const sql = `INSERT INTO users VALUES(
        DEFAULT , ? , ? , ? , ? , ?
    )`;

    // Execute:
    const result : OkPacket = await dal.execute(sql , [user.firstName , user.lastName , user.email , user.userPassword , user.role]);

    // Get auto-increment user id:
    user.userId = result.insertId;

    // Create token:
    const token = cyber.createToken(user);

    // Return token:
    return token;
}



// Check if email is already registered:
async function isEmailTaken(email: string) : Promise<boolean>{

    // Create sql:
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS isTaken`;

    // Execute : 
    const result = await dal.execute(sql , [email])
    
    // Get is taken value:
    const isTaken : number = result[0].isTaken;

    // Return true if email is taken:
    return isTaken === 1;
}

// Login:
async function login(credentials : CredentialsModel) : Promise<string> {
    
    // Validate credentials:
    credentials.validate();

    // Hash password:
    credentials.userPassword = cyber.hashPassword(credentials.userPassword);

    // Check if user exist:
    const sql = `SELECT * FROM users WHERE email = ? AND userPassword = ?`;

    // Execute:
    const users = await dal.execute(sql , [credentials.email , credentials.userPassword]);

    // If user does not exist:
    if(users.length === 0) throw new UnauthorizedError("Incorrect email or password");

    // Extract user:
    const user = users[0];

    // Create token:
    const token = cyber.createToken(user);

    // Return token;
    return token;
}

export default {
    register,
    login
};