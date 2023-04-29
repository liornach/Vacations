import { VacationData } from '../../../Models/VacationModel';
import appConfig from '../../../Utils/AppConfig';
import { useEffect, useState } from 'react';
import './VacationCard.css';
import vacationsService from '../../../Services/VacationsService';
import notifyService from '../../../Services/NotifyService';
import { format } from "date-fns"

interface CardProps {
    vacation: VacationData,
    userId : number
}

function VacationCard({vacation , userId}: CardProps) : JSX.Element {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { destination, imageName, description, isFollowing , vacationId , startDate , endDate} = vacation;
    const [isFollowed, setIsFollowed] = useState<boolean>(isFollowing === 1);

    // Handling follow requests:
    const handleFollow = async (): Promise<void> => {

        // If user us already following - execute unfollow
        if (isFollowed) {

            // Call service to unfollow vacation:
            vacationsService.unfollowVacation(vacationId , userId)
            .then(()=>setIsFollowed(false))
            .catch(err => notifyService.error(err));
        }
        else {
            // If user is not following , execute follow:
            vacationsService.followVacation(vacationId , userId)
            .then(()=>setIsFollowed(true))
            .catch(err => notifyService.error(err));
        }
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
        <div className="VacationCard">

            <button onClick={handleFollow}>
                {isFollowed ? 'Unfollow' : 'Follow'} | {vacation.followersCount}
            </button>
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

export default VacationCard;
