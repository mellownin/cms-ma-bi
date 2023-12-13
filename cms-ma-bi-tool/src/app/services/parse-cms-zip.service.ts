import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import JSZip from 'jszip';
import { Observable, from, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZipService {
  constructor(private http: HttpClient) {}

  fetchDataFromZipFile(url: string): Observable<{ [fileName: string]: string }> {
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      switchMap(response => {
        const zip = new JSZip();
        return zip.loadAsync(response);
      }),
      switchMap(zipData => {
        const csvFiles: Promise<{ fileName: string; content: string }>[] = [];
        Object.keys(zipData.files).forEach(fileName => {
          if (fileName.endsWith('.csv')) {
            const filePromise = zipData.files[fileName].async('string')
              .then(content => ({ fileName, content }));
            csvFiles.push(filePromise);
          }
        });
        return forkJoin(csvFiles);
      }),
      map(fileContentsArray => {
        const result: { [fileName: string]: string } = {};
        fileContentsArray.forEach(fileContent => {
          result[fileContent.fileName] = fileContent.content;
        });
        return result;
      })
    );
  }
}
