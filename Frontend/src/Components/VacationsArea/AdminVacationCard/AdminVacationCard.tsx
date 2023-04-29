import { useState } from "react";
import { VacationData } from "../../../Models/VacationModel";
import "./AdminVacationCard.css";
import { format } from "date-fns";
import appConfig from "../../../Utils/AppConfig";
import { useNavigate } from "react-router-dom";

interface CardProps {
    vacation : VacationData,
    userId : number;
}

function AdminVacationCard({vacation , userId} : CardProps): JSX.Element {

    const [showFullDescription, setShowFullDescription] = useState(false);

    const { destination, imageName, description, vacationId , startDate , endDate} = vacation;

    const navigate = useNavigate();

    const handleEditClick = (): void => {
        navigate("/vacations/edit/" + vacationId);
    };

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

////// !!!!! need to check in this page if the navigate is fine
    const getDescriptionFull = (): string => {
        return description;
    };
    

    return (
        <div className="AdminVacationCard">

            <div>
			<button onClick={handleEditClick}>Edit</button>
            <button>Delete</button>
            </div>

            <p>{destination}</p>
            <img src={appConfig.vacationsImagesUrl + imageName} alt={destination} />
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
