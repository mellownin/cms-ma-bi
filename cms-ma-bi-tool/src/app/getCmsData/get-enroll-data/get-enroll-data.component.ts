import { Component } from '@angular/core';
import { ZipService } from '../../services/parse-cms-zip.service';

@Component({
  selector: 'app-get-enroll-data',
  templateUrl: './get-enroll-data.component.html',
  styleUrls: ['./get-enroll-data.component.css']
})
export class GetEnrollDataComponent {
  csvContents: { [fileName: string]: string } = {};
  firstFileName: string | undefined;
  tableHeaders: string[] = [];

  constructor(private zipService: ZipService) {}

  fetchData() {
    const url = 'https://www.cms.gov/files/zip/monthly-enrollment-cpsc-november-2023.zip';
    
    this.zipService.fetchDataFromZipFile(url).subscribe({
      next: data => {
        this.csvContents = data;
        console.log('Extracted CSV files:', data); // Log received data for verification
        this.firstFileName = Object.keys(data)[0]; // Get the first file name
        if (this.firstFileName) {
          const lines = data[this.firstFileName].split('\n');
          if (lines.length > 0) {
            this.tableHeaders = lines[0].split(','); // Extract headers from the first line
          }
        }
      },
      error: error => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Process complete');
      }
    });
  }
}
