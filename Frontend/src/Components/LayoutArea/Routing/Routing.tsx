import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import { useEffect, useState } from "react";
import Vacations from "../../VacationsArea/Vacations/Vacations";
import Register from "../../AuthArea/Register/Register";
import { AuthState, authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/UserModel";
import AdminVacations from "../../VacationsArea/AdminVacations/AdminVacations";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";

function Routing(): JSX.Element {

    // Creating state to check if user is logged in:
    const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin , setIsAdmin] = useState<boolean>(false);

    // Function to check if user is logged in:
    function isUserLoggedIn(): boolean {
        
        // Get user state from auth store:
        const loggedInStatus = authStore.getState().user;

        // If user is  logged in:
        if(loggedInStatus) {setIsLoggedIn(true);
            isUserAdmin(loggedInStatus);
            return;
            }

        // if user is not logged in:
        setIsLoggedIn(false);
    }

    // Function to check if user is admin:
    function isUserAdmin(user : UserModel): boolean {
        // If user is admin:
        if (user.role === 1){
            setIsAdmin(true);
            return;
        }
        // If user is not admin:
        setIsAdmin(false);
    }

    // When routing component is rendering (only)for the first time:
    useEffect(()=>{
        isUserLoggedIn();

        // Set changes in states every time user auth state is changed:
        const unsubscribe = authStore.subscribe(()=>{
            isUserLoggedIn();
        });

        // Unsubscribe
        return ()=> unsubscribe();
    } ,[])


    return (
			<Routes>
                <Route path="/home" element={<Home />}/>
                <Route path="/vacations" element={isAdmin? <AdminVacations /> : (isLoggedIn ? <Vacations /> : <Navigate to="/login"/>)}/>
                <Route path="/insert" element={isAdmin ? <Insert /> : <Navigate to="/vacations"/>}/>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/vacations"/> : <Login />}/>
                <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/vacations"/> } />
                {/* {isAdmin? <Route path="/vacations/edit/:vacationId([0-9]+)"/> : null} */}
                <Route path="/vacations/edit/:vacationId" element={<EditVacation/>}/>
                <Route path="/" element={<Navigate to="/login" />}/>
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
    );
};

export default Routing;
