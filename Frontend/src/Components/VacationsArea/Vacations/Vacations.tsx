import { useState, useEffect } from "react";
import { VacationData } from "../../../Models/VacationModel";
import "./Vacations.css";
import vacationsService from "../../../Services/VacationsService";
import { vacationsStore } from "../../../Redux/VacationState";
import { AuthState, authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { useNavigate } from "react-router-dom";


function Vacations(): JSX.Element {

// Use navigate:
const navigate = useNavigate();

// Use state
const [vacations, setVacations] = useState<VacationData[]>([]);


// When page is first loading
useEffect(()=>{

    // Get user state:
    const authState : AuthState = authStore.getState();

    // Call service and send back user id:
    vacationsService.getVacations(authState.user.userId)
    .then(vacations => {setVacations(vacations)
    
    const unsubscribe = vacationsStore.subscribe(()=>{
    const duplicatedVacations = [...vacationsStore.getState().vacations];
    setVacations(duplicatedVacations);
    });

    return () => unsubscribe();
})
.catch(err => {
    if(err.response!.status === 401){
        notifyService.error("You must be logged in");
        navigate('/login');
        // TODO:
        // TO create redux that check if user is logged in 
        // Otherwise - to show him the same error
        // Navigate him to login page
    }
    else{
        notifyService.error(err)
    }
});
}, []);

    return (
        <div className="Vacations">
			vacations page...

            {vacations.map(v => <VacationCard key={v.vacationId} vacation={v}/>)}
        </div>
    );
}

export default Vacations;
