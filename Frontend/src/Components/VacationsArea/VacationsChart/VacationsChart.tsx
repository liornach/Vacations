import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { VacationData, VacationModel } from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import vacationsService from "../../../Services/VacationsService";
import "./VacationsChart.css";
import { Chart, registerables } from 'chart.js';
import CsvService from "../../../Services/CsvService";
import csvService from "../../../Services/CsvService";

Chart.register(...registerables);
Chart.defaults.color = '#000';

function VacationsChart(): JSX.Element {
    const [vacations, setVacations] = useState<VacationData[]>([]);
    const userId = authStore.getState().user.userId;

    useEffect(() => {
      const fetchVacations = async () => {
        const vacationsData = await vacationsService.getVacations(userId); 
        setVacations(vacationsData);
      };
  
      fetchVacations();
    }, []);

    function exportToCsv(vacations : VacationData[]){
        csvService.exportToCsv(vacations);
    }

    function handleDownload() : void{
        exportToCsv(vacations);
    }
  
    return (
      <div>
        <h2>Vacation Chart</h2>
        <button onClick={handleDownload}>Download As .csv File</button>
        <Bar
          data={{
            labels: vacations.map((vacation) => vacation.destination),
            datasets: [
              {
                label: 'Followers',
                data: vacations.map((vacation) => vacation.followersCount),
                backgroundColor: 'rgb(	0, 0, 255)',
                borderColor: 'rgb(	0, 0, 255)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                    // forces step size to be 1 unit
                    stepSize: 1
                  }
              },
            },
          }}
        />
      </div>
    );
}

export default VacationsChart;