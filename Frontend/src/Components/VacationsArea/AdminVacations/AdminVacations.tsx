import { useState, useEffect, useMemo } from "react";
import { VacationData } from "../../../Models/VacationModel";
import "./AdminVacations.css";
import vacationsService from "../../../Services/VacationsService";
import { vacationsStore } from "../../../Redux/VacationState";
import { AuthState, authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";


function AdminVacations(): JSX.Element {

// Use navigate:
const navigate = useNavigate();

// Vacations use state:
const [vacations, setVacations] = useState<VacationData[]>([]);

const userId : number = authStore.getState().user.userId;


// Logout
function logout(): void {
    authService.logout();
    notifyService.success("You Have been logged out");
    navigate("/login");
}

// When page is first loading
useEffect(()=>{

    // Get user state:
    const authState : AuthState = authStore.getState();

    // If user is not connected:
    if(!userId){
        notifyService.error("You must be logged in");
        navigate("/login");
        return;
    }

    // Call service and send back user id:
    vacationsService.getVacations(userId)
    .then(vacations => {
    setVacations(vacations);
    
    //!!!!! later I'll check if these lines are really necessary
    const unsubscribe = vacationsStore.subscribe(()=>{
    const duplicatedVacations = [...vacationsStore.getState().vacations];
    setVacations(duplicatedVacations);
    });

    return () => unsubscribe();
})
.catch(err => {
    if(err.response!.status === 401){

        authService.logout();
        notifyService.error("You must be logged in");
        navigate('/login');
    }
    else if(err.response!.status === 403){
        notifyService.error("Access denied");
        navigate("/login");
    }
    else{
        notifyService.error(err)
    }
});
}, []);

    return (
        <div className="Vacations">    

            <span className="Logout"><button onClick={logout}>Logout</button></span>

            <div className="Container">
            {vacations.map(v => <AdminVacationCard key={v.vacationId} vacation={v} userId={userId}/>)}
            </div>
        </div>
    );
}

export default AdminVacations;
