import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import { useState } from "react";
import notifyService from "../../../Services/NotifyService";
import Vacations from "../../VacationsArea/Vacations/Vacations";

function Routing(): JSX.Element {

    // Use Navigate:
    const navigate = useNavigate();

    // Creating state to check if user is logged in:
    const [isLoggedIn , setIsLoggedIn] = useState(false);


    // // Checking auth errors:
    // function handleAuthError(error : any) {
    //     if(error.response){
            
    //         // If user is not logged in:
    //         if(error.response.status === 401){
    //             setIsLoggedIn(false);
    //             navigate("/login");
    //         }

    //         // If user try to get a page he doesn't have access to:
    //         else if (error.response.status === 403){
    //             notifyService.error("Access Denied!");
    //             navigate("/vacations");
    //         }

    //         else {
    //             notifyService.error(error);
    //         }
    //     }

    //     else {
    //         notifyService.error(error);
    //         navigate("/login");
    //     }
    // }
    

    return (
			<Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/vacations" element={<Vacations />}/>
                <Route path="/insert" element={<Insert />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/" element={<Navigate to="/login" />}/>
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
    );
}

export default Routing;
