import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";

function Login(): JSX.Element {

    const { register , handleSubmit } = useForm<CredentialsModel>();

    const navigate = useNavigate()

    async function send(credentials : CredentialsModel){
        try{
            await authService.login(credentials);
            notifyService.success("Welcome back!");
            navigate("/vacations");
        }
        catch(err:any){
            notifyService.error(err);
        }
    }
    return (
        <div className="Login">
			
            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input type="email" required maxLength={40} {...register("email")} />

                <label>Password:</label>
                <input type="password" minLength={4} maxLength={40} required {...register("userPassword")} />

                <button>Login</button>

            </form>

        </div>
    );
}

export default Login;
