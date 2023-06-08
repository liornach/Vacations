import { ExportToCsv } from 'export-to-csv';
import { VacationData } from '../Models/VacationModel';

class CsvService {

    private options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'My Awesome CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true
};

    private csvExporter = new ExportToCsv(this.options);

    public exportToCsv(vacations : VacationData[]): void {
        const dataToExport = vacations.map(vacation => {
            return {
              Destination: vacation.destination,
              Followers: vacation.followersCount
            };
          });
      
          this.csvExporter.generateCsv(dataToExport);
        }
        
}


const csvService = new CsvService();
export default  csvService;

