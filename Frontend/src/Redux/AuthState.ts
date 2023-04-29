import jwtDecode from 'jwt-decode';
import { createStore } from 'redux';
import UserModel from '../Models/UserModel';


export class AuthState {

    public token: string;
    public user: UserModel;
    public logoutTimeoutId: NodeJS.Timeout;

    public constructor() {
        this.token = localStorage.getItem('token');
        if(this.token) {
            this.user = jwtDecode<{user : UserModel}>(this.token).user;
        }
    }   
}

// Action types
export enum AuthActionType {
    Register,
    Login,
    Logout
}

// Action interface
export interface AuthAction {
    type : AuthActionType;
    payload?:string;
}

// Redux Reducer:

export function authReducer(currentState = new AuthState() , action : AuthAction) : AuthState {

    // Create a new state:
    const newState = {...currentState};

    // Perform rhe needed action:
    switch(action.type) {
        case AuthActionType.Register: // Payload = token
        case AuthActionType.Login: // Payload = token
        newState.token = action.payload;
        newState.user = jwtDecode<{user : UserModel}>(action.payload).user;
        localStorage.setItem("token" , newState.token)
        break;
        case AuthActionType.Logout: // We don't have any payload:
        newState.token = null;
        newState.user = null;
        localStorage.removeItem("token");
        break;
    }

    return newState;
}

export const authStore = createStore(authReducer);