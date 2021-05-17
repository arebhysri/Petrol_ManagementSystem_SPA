import { Injectable } from '@angular/core';
import * as globals from '../core/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { fualTypeSection } from '../core/fualTypeSection';

@Injectable({
  providedIn: 'root'
})
export class FuelSectionService {

  private getAllFuelRecordURL = globals.baseServer + 'api/getallfuelrecord';
  private getAllFuelRecordByIdURL = globals.baseServer + 'api/getallfuelrecordbyid';
  private createFuelTypeURL = globals.baseServer + 'api/createfuelType/';

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

  //add fuel inventory details
  creatFuelInventory(fuelType: fualTypeSection, id: number) {

    return this.http.post(this.createFuelTypeURL + id, fuelType, { observe: 'response' })
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
  //get all record byid
  getFuelRecordById(id:number):Observable<any>{
    
    const params = id
    return this.http.get(this.getAllFuelRecordByIdURL+"/"+params)
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
