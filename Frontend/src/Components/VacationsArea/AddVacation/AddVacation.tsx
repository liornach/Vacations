import { useForm } from "react-hook-form";
import "./AddVacation.css";
import { VacationModel } from "../../../Models/VacationModel";
import { NavLink, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { useState } from "react";

function AddVacation(): JSX.Element {

const { register, handleSubmit } = useForm<VacationModel>();

const navigate = useNavigate();

const [vacationImage, setImage] = useState("");

// Handle change when new image is added:
function handleChange(event:any){
    if(event.target.files.length > 0){
        const src = URL.createObjectURL(event.target.files[0]);
        setImage(src);
    }
}


    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation added successfully");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation Box">

            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(send)}>


                <label>Destination</label>
                <input type="text" {...register("destination")} required minLength={2} maxLength={60} />

                <label>Description</label>
                <textarea cols={30} rows={10} required minLength={0} maxLength={1000} {...register("description")}></textarea>
                <br />

                <label>Start Date</label>
                <input type="date" {...register("startDate")} required maxLength={15} />

                <label>End Date</label>
                <input type="date" {...register("endDate")} required maxLength={15} />

                <label>Price</label>
                <input type="number" {...register("price")} required min={0} max={10000} />

                <label>Cover image</label>
                <input type="file" accept="image/*" onInput={handleChange} {...register("image")} />

                <img src={vacationImage} />

                <button>Add Vacation</button>

                <div className="back"><NavLink to="/vacations">Back</NavLink></div>

            </form>
        </div>
    );
}

export default AddVacation;
