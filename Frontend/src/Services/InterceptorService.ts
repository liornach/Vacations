import axios, { AxiosRequestHeaders } from "axios";
import { authStore } from "../Redux/AuthState";


class InterceptorService {

    //Create interceptor
    public create():void{

        // Register to any request
        axios.interceptors.request.use(requestObject => {

            //If we have a token
            if(authStore.getState().token){

                // Add authorization header containing the token
                requestObject.headers = {
                    Authorization: "Bearer " + authStore.getState().token
                } as AxiosRequestHeaders;
            }

            return requestObject;

        })
    }
}

const interceptorService = new InterceptorService();

export default interceptorService;