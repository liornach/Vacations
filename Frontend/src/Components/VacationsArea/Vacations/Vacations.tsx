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
// Use states:
const [vacations, setVacations] = useState<VacationData[]>([]);
const [filterOption, setFilterOption] = useState<string>("all");
const [sortedVacations, setSortedVacations] = useState<VacationData[]>([]);
const [currentPage, setCurrentPage] = useState<number>(1);
const [vacationsPerPage] = useState<number>(9);
// Variables
const userId : number = authStore.getState().user.userId;
const indexOfLastVacation = currentPage * vacationsPerPage;
const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
const currentVacations = sortedVacations.slice(indexOfFirstVacation, indexOfLastVacation);
const userFirstName = authStore.getState().user.firstName;

const totalPages = Math.ceil(sortedVacations.length / vacationsPerPage);

const handlePageChange = (pageNumber: number) => {
  setCurrentPage(pageNumber);
};

const renderPaginationButtons = () => {
  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <button
        key={i}
        className={currentPage === i ? "active" : ""}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }
  return buttons;
};


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

// Function to sort vacations by start date:
useEffect(() => {
    // Sort the vacations based on start dates
    const sorted = filteredVacations.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    // Set the sorted vacations in state
    setSortedVacations(sorted);
  }, [filteredVacations]);

useEffect(()=>{
        // Ensure that the page is scrolled up to the top:
        window.scrollTo(0, 0);
} , [currentPage]);

useEffect(() => {
    const totalPages = Math.ceil(sortedVacations.length / vacationsPerPage);
  
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage === 0 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [sortedVacations, currentPage, vacationsPerPage]);

// When page is first loading
useEffect(()=>{
    // If user is not connected:
    if(!userId){
        notifyService.error("You must be logged in");
        navigate("/login");
        return;
    }
    // Call service and send user id:
    vacationsService.getVacations(userId)
    .then(vacations => {
    setVacations(vacations);
    // Redux subscribe/unsubscribe:
    const unsubscribe = vacationsStore.subscribe(()=>{
    const duplicatedVacations = [...vacationsStore.getState().vacations];
    setVacations(duplicatedVacations);
    });
    // When component is destroyed:
    return () => unsubscribe();
})
.catch(err => {
    if(err.response!.status === 401){
        // Logout the use to clean token if there is token , but don't notify him
        authService.logout();
        navigate('/login');
    } else {
        notifyService.error(err)
    }
});
},[]);

    return (
        <div className="Vacations">
            <div>

            <span>Hello {userFirstName}!</span>
            <hr />
            <label>Filters: | </label>
            <label>
                All
                <input type="radio" name="options" value={"all"} onChange={handleFilters}
                defaultChecked
                />
            </label><span> | </span>

            <label>
                Followed
                <input type="radio" name="options" value={"followedOnly"} onChange={handleFilters}/>
            </label><span> | </span>

            <label>
                Up Comings
                <input type="radio" name="options" value={"upComingOnly"} onChange={handleFilters}/>
            </label><span> | </span>

            <label>
                On Goings
                <input type="radio" name="options" value={"onGoingOnly"} onChange={handleFilters}/>
            </label>
            </div>

            <span className="UserLogout"><button onClick={logout}>Logout</button></span>

    
            <div className="Container">
            {currentVacations.map(v => <VacationCard key={v.vacationId} vacation={v} userId={userId}/>)}
            </div>

            <div className="pagination">{renderPaginationButtons()}</div>
        </div>
    );
}

export default Vacations;
