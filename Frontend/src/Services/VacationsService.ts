import axios from "axios";
import { VacationData, VacationModel } from "../Models/VacationModel";
import { vacationsStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";
import { VacationActionType } from "../Redux/VacationState";


class VacationsService {

    // Get all vacation:
    public async getVacations(userId : number): Promise<VacationData[]>{

        // Take vacations from global state (If there are ones):
        let vacations = vacationsStore.getState().vacations;

        // If store is empty , get vacations with API:
        if(vacations.length === 0){
            // Get vacation from REST API:
            const response = await axios.get<VacationData[]>(appConfig.vacationsUrl + userId);

            // Extract vacations:
            vacations = response.data;

            // Update global state:
            vacationsStore.dispatch({type:VacationActionType.FetchVacations , payload: vacations});
        }

        // Return vacations:
        return vacations;
    }

    // Get one vacation (redux only)
    public async getOneVacation(vacationId : number , userId: number) :Promise<VacationData>{

        // Get all vacations:
        const vacations = await this.getVacations(userId);

        // Find specific vacations:
        let vacation = vacations.find(v => v.vacationId === vacationId);

        // Return:
        return vacation;

    }

    public async addVacation(vacation : VacationModel) : Promise<void>{

        this.postDatesValidation(vacation.startDate , vacation.endDate);

        const formData = new FormData();

        // Append the vacation date to the form data:
        formData.append("destination" , vacation.destination);
        formData.append("description" , vacation.description);
        formData.append("startDate" , vacation.startDate);
        formData.append("endDate" , vacation.endDate);
        formData.append("price" , vacation.price.toString());

        // Append the image file to the form data:
        if (vacation.image) formData.append("image" , vacation.image);

        // Send vacation to server:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl , formData);

        // Get the added vacation:
        const addedVacation = response.data;

        // Add That vacation to global state:
        vacationsStore.dispatch({type:VacationActionType.AddVacation , payload:addedVacation});
    }

    public async editVacation(vacation : VacationModel) : Promise<void> {

        this.putDatesValidation(vacation.startDate , vacation.endDate);

        // Create header for handling image:
        const headers = {"content-type": "multipart/form-data"};

        // Send vacation to server:
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId , vacation , {headers});

        // Get the updated vacation:
        const updatedVacation = response.data;

        // update global store with the updated vacation:
        vacationsStore.dispatch({type:VacationActionType.UpdateVacation , payload : updatedVacation});
    }

    public async deleteVacation(vacationId : number) : Promise<void> {
        // Delete vacation from server:
        await axios.delete<VacationModel>(appConfig.vacationsUrl + vacationId);

        // Delete vacation from global store:
        vacationsStore.dispatch({type:VacationActionType.DeleteVacation , payload:vacationId});
    }

    // follow:
    public async followVacation(vacationId : number , userId : number) : Promise<void> {

        // Send follow request to server:
        await axios.post(appConfig.followUrl + vacationId + "/" + userId);
        
        // Get vacation from global state:
        let vacation = await this.getOneVacation(vacationId , userId);

        // Change vacation followers values:
        vacation = {...vacation , followersCount : vacation.followersCount + 1, isFollowing : 1};

        // Update vacation store:
        vacationsStore.dispatch({type:VacationActionType.UpdateVacation, payload: vacation});
    }

    // Unfollow : 
    public async unfollowVacation(vacationId: number , userId: number) : Promise<void>{

        // Send unfollow request to server:
        await axios.delete(appConfig.unFollowUrl + vacationId + "/" + userId);

        // Get vacation from global state:
        let vacation = await this.getOneVacation(vacationId , userId);

        // Change vacation followers value:
        vacation = {...vacation , followersCount : vacation.followersCount -1 ,isFollowing : 0};

        // Update vacation store:
        vacationsStore.dispatch({type:VacationActionType.UpdateVacation , payload: vacation});
    }

        // Validation for dates:
        private postDatesValidation(start : string , end : string) : void{

            // If start date has already passed:
            const now = new Date();
            const startDate = new Date(start)
            if(startDate < now) throw new Error("Start date has already been passed!");
    
            // To validate further , go tto putDatesValidation:
            this.putDatesValidation(start , end);
        }

        private putDatesValidation(start : string , end : string){

            const startDate = new Date(start)
            const endDate = new Date(end);
            if (endDate < startDate) throw new Error("End date cannot be before start date!");
        }
    
};

const vacationsService = new VacationsService();

export default vacationsService;