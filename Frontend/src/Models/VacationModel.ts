export class VacationModel {

    public vacationId: number;
    public destination: string;
    public description : string;
    public startDate : string;
    public endDate : string;
    public price : number;
    public imageName : string;
    public image: File;
    
}

export interface VacationData extends VacationModel{
    isFollowing: number;
    followersCount:number;
}

