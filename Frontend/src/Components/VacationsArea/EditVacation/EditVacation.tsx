import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import { useForm } from "react-hook-form";
import { VacationData } from "../../../Models/VacationModel";
import appConfig from "../../../Utils/AppConfig";
import notifyService from "../../../Services/NotifyService";
import { authStore } from "../../../Redux/AuthState";
import { format } from "date-fns";
import { NavLink } from "react-router-dom";

function EditVacation(): JSX.Element {

const params = useParams();
const {register , handleSubmit , setValue} = useForm<VacationData>();
const navigate = useNavigate();
const [vacationToEdit , setVacationToEdit] = useState<VacationData>();
const [vacationImage, setImage] = useState("");
const userId = authStore.getState().user.userId;
const vacationId = +params.vacationId;

// Handle change when new image is added:
function handleChange(event:any){
    if(event.target.files.length > 0){
        const src = URL.createObjectURL(event.target.files[0]);
        setImage(src);
    }
}

// Should run a test on what happens when i enter vacationId that doesn't exist.
// get vacation to edit:
useEffect(()=>{
    vacationsService.getOneVacation(vacationId , userId).
    then(v=>{
    setVacationToEdit(v);

    // Set values in form
    let k : keyof VacationData;
    for(k in v){

        // If value is date , change the format to fit the form
        const value = k === "startDate" || k === "endDate" ? format(new Date(v[k]) , 'yyyy-MM-dd').toString() : v[k];
        setValue(k, value);
    }
    }).
    catch((err:any)=>{
        notifyService.error(err);
    });

},[])

useEffect(()=>{
    // Return if no vacation to edit yet
    if(vacationToEdit === undefined) return;

    // Set image
    const image = appConfig.vacationsImagesUrl + vacationToEdit?.imageName;
    setImage(image);
} , [vacationToEdit]);

async function send(vacation : VacationData){
    try{
        vacation.image = (vacation.image as unknown as FileList)[0];  
        await vacationsService.editVacation(vacation);
        notifyService.success("Vacation has been updated");
        navigate("/vacations")
    }
    catch(err:any){
        notifyService.error(err);
    }
};


    return (
        <div className="EditVacation">
			<h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>


                <label>Destination</label>
                <input type="text" {...register("destination")} required minLength={2} maxLength={60}/>

                <label>Description</label>
                <textarea cols={30} rows={10} required minLength={0} maxLength={1000} {...register("description")}></textarea>

                <label>Start On</label>
                <input type="date" {...register("startDate")} required maxLength={15} />

                <label>End Date</label>
                <input type="date" {...register("endDate")} required maxLength={15}/>

                <label>Price</label>
                <input type="number" {...register("price")} required min={0} max={10000}/>

                <label>Cover image</label>
                <input type="file" accept="image/*" onInput={handleChange} {...register("image")}/>

                <img src={vacationImage} />

                <button>Update</button>

                <div className="back"><NavLink to="/vacations">Back</NavLink></div>

            </form>
        </div>
    );
}

export default EditVacation;
