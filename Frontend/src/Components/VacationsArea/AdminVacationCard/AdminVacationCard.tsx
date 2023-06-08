import { useState } from "react";
import { VacationData } from "../../../Models/VacationModel";
import "./AdminVacationCard.css";
import { format } from "date-fns";
import appConfig from "../../../Utils/AppConfig";
import { useNavigate } from "react-router-dom";
import  vacationService from "../../../Services/VacationsService";
import confirmationService from "../../../Services/ConfirmationService";
import notifyService from "../../../Services/NotifyService";

interface CardProps {
    vacation : VacationData,
    userId : number;
}

function AdminVacationCard({vacation , userId} : CardProps): JSX.Element {

    const [showFullDescription, setShowFullDescription] = useState(false);

    const { destination, imageName, description, vacationId , startDate , endDate} = vacation;

    const navigate = useNavigate();

    const handleEdit = (): void => {
        navigate("/vacations/edit/" + vacationId);
    };

    // Still need to add design
    const handleDelete = (): void => {
        confirmationService.showConfirmation('Are you sure you want to delete?', () => {
            // Perform the delete operation
            deleteVacation();
          });
    };

    const deleteVacation = (): void => {
        vacationService.deleteVacation(vacationId)
        .then(()=>notifyService.success("Vacation deleted successfully"))
        .catch(err=>notifyService.error(err));
    }

    const toggleDescription = (): void => {
        setShowFullDescription(!showFullDescription);
    };

    // If i gonna leave it this way. I will have to use useMemo hook.
    const getDescriptionPreview = (): string => {
        const words = description.split(' ');
        if (words.length <= 50) {
            return description;
        }
        return `${words.slice(0, 50).join(' ')}...`;
    };

    const getDescriptionFull = (): string => {
        return description;
    };
    

    return (
        <div className="AdminVacationCard">

            <div>
			<button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            </div>

            <p>{destination}</p>

            {/* Conditional rendering for images */} 
            {imageName ? <img src={appConfig.vacationsImagesUrl + imageName} alt={destination} /> : null}

            <p>{format(new Date(startDate), 'd.M.yyyy')} - {format(new Date(endDate), 'd.M.yyyy')}</p>
            <p>{showFullDescription ? getDescriptionFull() : getDescriptionPreview()}</p>
            {description.length > 50 && (
                <button onClick={toggleDescription}>
                    {showFullDescription ? 'See Less' : 'See More'}
                </button>
            )}
        </div>
    );
}

export default AdminVacationCard;
