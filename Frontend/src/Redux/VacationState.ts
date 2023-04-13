import { createStore } from "redux";
import { VacationData } from "../Models/VacationModel";


export class VacationState {
    public vacations : VacationData[] = [];
}

// Vacations Action Type:
export enum VacationActionType {
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation
}

// Vacation Action Interface:
export interface VacationAction{
    type : VacationActionType;
    payload : any;
}

// Vacation Reducer:
export function vacationsReducer(currentState = new VacationState() , action : VacationAction) : VacationState{

    // Duplicate current state into a new state:
    const newState = {...currentState};

    // Performed needed action on the newState:
    switch(action.type){
        case VacationActionType.FetchVacations: // Payload = All vacations
            newState.vacations = action.payload
            break;

        case VacationActionType.AddVacation: // Payload = Vacation object for adding:
            newState.vacations.push(action.payload);
            break;

        case VacationActionType.UpdateVacation: // Payload = Vacation object for update:
        const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
        if (indexToUpdate >= 0) {
            newState.vacations[indexToUpdate] = action.payload;
        }
        break;

        case VacationActionType.DeleteVacation: // Payload = Vacation id for deleting:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0){
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
    }
    return newState;
}

// Vacation store:
export const vacationsStore = createStore(vacationsReducer);