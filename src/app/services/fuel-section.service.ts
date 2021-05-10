import { Injectable } from '@angular/core';
import * as globals from '../core/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuelSectionService {

  private getAllFuelRecordURL = globals.baseServer + 'api/getallfuelrecord';

  constructor(private http: HttpClient) { }
  //get all fuel record
  getAllRecord(): Observable<any> {
    return this.http.get(this.getAllFuelRecordURL, { observe: 'response' })
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
