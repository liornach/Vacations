import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {

    public async isAdmin(): Promise<boolean> {

        // Get user state:
        const role = authStore.getState().user.role;

        if(role === 1) return true;
        return false;
    }

    public async isLoggedIn() : Promise<boolean> {
        // Get user state:
        const state = authStore.getState().user?.role;

        if(state) return true;
        return false;
    }

    public async register(user:UserModel) : Promise<void> {
        
        // Send user to backend for registration:
        const response = await axios.post<string>(appConfig.registerUrl , user);

        // Extract token:
        const token = response.data;

        // Save token in global state:
        authStore.dispatch({type:AuthActionType.Register , payload:token});
    }

    public async login(credentials : CredentialsModel) : Promise<void>{

        // Send credentials to backend to login:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract token:
        const token = response.data

        // Save token in global state:
        authStore.dispatch({type:AuthActionType.Login, payload:token});
    }

    public logout() : void {
        // Logout in global state:
        authStore.dispatch({type:AuthActionType.Logout});
    }
}

const authService = new AuthService();

export default authService;