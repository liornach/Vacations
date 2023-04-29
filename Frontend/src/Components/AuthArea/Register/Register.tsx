import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { NavLink } from "react-router-dom";

function Register(): JSX.Element {

    // Use form:
    const { register , handleSubmit } = useForm<UserModel>();

    // use navigate:
    const navigate = useNavigate();

    // Send registration:
    async function send(user:UserModel){
        try{
            await authService.register(user);
            notifyService.success("Welcome!");
            navigate("/vacations");
        }
        catch(err : any){
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">
			
            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First Name:</label>
                <input type="text" {...register("firstName")} />

                <label>Last Name:</label>
                <input type="text" {...register("lastName")} />

                <label>Email:</label>
                <input type="email" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("userPassword")} />

                <button>Register</button>

                <p>Already have an account? <NavLink to="/login">Login</NavLink></p>

            </form>
        </div>
    );
}

export default Register;
