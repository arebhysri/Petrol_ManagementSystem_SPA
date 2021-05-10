import { Injectable } from '@angular/core';
import * as globals from '../core/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PumpSectionService {

  private getAllPumpRecordURL = globals.baseServer + 'api/getallpumprecord';

  constructor(private http: HttpClient) { }

  //get all pump record
  getAllRecord(): Observable<any> {
    return this.http.get(this.getAllPumpRecordURL, { observe: 'response' })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        }
        )
      )
  }
}
