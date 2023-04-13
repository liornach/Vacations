import { VacationData } from '../../../Models/VacationModel';
import appConfig from '../../../Utils/AppConfig';

interface CardProps {
    vacation : VacationData;
}

function VacationCard(props : CardProps) {
    return (
    <div className="VacationCard">
        <img src={appConfig.vacationsImagesUrl + props.vacation.imageName} />
        <br /><br />
        <p>{props.vacation.destination}</p>
        <br />
    </div>
    );
}

export default VacationCard;