import React, { useState, useEffect, useMemo } from "react";
import { VacationData } from "../../../Models/VacationModel";
import "./Vacations.css";
import vacationsService from "../../../Services/VacationsService";
import { vacationsStore } from "../../../Redux/VacationState";
import { AuthState, authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import VacationCard from "../VacationCard/VacationCard";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";


function Vacations(): JSX.Element {

// Use navigate:
const navigate = useNavigate();

// Vacations use state:
const [vacations, setVacations] = useState<VacationData[]>([]);

// Filters use state:
const [filterOption, setFilterOption] = useState<string>("all");

// Get user id from auth store:
const userId : number = authStore.getState().user.userId;

// Logout
function logout(): void {
    authService.logout();
    notifyService.success("You Have been logged out");
    navigate("/login");
}

// Set the user's choice filter:
const handleFilters = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setFilterOption(e.target.value);
}

// Filter vacation:
const filteredVacations = useMemo(()=>{

    switch (filterOption) {
        // all vacations
        case "all":
            return vacations;

        // Only followed vacations:
        case "followedOnly":
            return vacations.filter((v)=> v.isFollowing === 1);
        
        // Only upcoming vacations:
        case "upComingOnly":
            return vacations.filter((v)=> new Date(v.startDate) > new Date());

        // Only ongoing vacations:
        case "onGoingOnly":
            return vacations.filter((v)=> new Date(v.startDate) <= new Date() && new Date(v.endDate) >= new Date());
    }

} , [vacations , filterOption])


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
    else{
        notifyService.error(err)
    }
});
}, []);

    return (
        <div className="Vacations">
            <div>

            <span className="Logout"><button onClick={logout}>Logout</button></span>

            <label>Filters: | </label>
            <label>
                All
                <input type="radio" name="options" value={"all"} onChange={handleFilters}
                defaultChecked
                />
            </label>
            <span> | </span>
            <label>
                Followed
                <input type="radio" name="options" value={"followedOnly"} onChange={handleFilters}/>
            </label>
            <span> | </span>
            <label>
                Up Comings
                <input type="radio" name="options" value={"upComingOnly"} onChange={handleFilters}/>
            </label>
            <span> | </span>
            <label>
                On Goings
                <input type="radio" name="options" value={"onGoingOnly"} onChange={handleFilters}/>
            </label>
            </div>
    
            <div className="Container">
            {filteredVacations.map(v => <VacationCard key={v.vacationId} vacation={v} userId={userId}/>)}
            </div>
        </div>
    );
}

export default Vacations;
