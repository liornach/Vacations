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
        // Create header for sending image:
        const headers = {"Content-Type": "multipart/form-data"};

        // Send vacation to server:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl , vacation , {headers});

        // Get the added vacation:
        const addedVacation = response.data;

        // Add That vacation to global state:
        vacationsStore.dispatch({type:VacationActionType.AddVacation , payload:addedVacation});
    }

    public async editVacation(vacation : VacationModel) : Promise<void> {
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
};

const vacationsService = new VacationsService();

export default vacationsService;