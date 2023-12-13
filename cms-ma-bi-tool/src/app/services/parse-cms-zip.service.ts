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

  fetchDataFromZipFile(url: string): Observable<string[]> {
    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      switchMap(response => {
        const zip = new JSZip();
        return zip.loadAsync(response);
      }),
      switchMap(zipData => {
        const csvFiles: Promise<string>[] = [];
        Object.keys(zipData.files).forEach(fileName => {
          if (fileName.endsWith('.csv')) {
            csvFiles.push(zipData.files[fileName].async('string'));
          }
        });
        return forkJoin(csvFiles);
      }),
      map(csvContents => csvContents as string[])
    );
  }
}
