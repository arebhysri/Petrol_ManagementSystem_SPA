import { Injectable } from '@angular/core';
import * as globals from '../core/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay} from 'rxjs/operators';
import { pumberTypeSection } from '../core/pumberTypeSection';

@Injectable({
  providedIn: 'root'
})
export class PumpSectionService {

  private getAllPumpRecordURL = globals.baseServer + 'api/getallpumprecord';
  private getAllPumpRecordByFuelCodeURL = globals.baseServer + 'api/getallPumbrecordbyfuelcode';
  private getAllpumbRecordByIdURL = globals.baseServer + 'api/getallPumbrecordbyid';
  private createPumbTypeURL = globals.baseServer + 'api/createPumb/';
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

  //get all pump record by fuel code
  getAllRecordByfuelCode(fuelCode:string): Observable<any> {
    const params = fuelCode
    return this.http.get(this.getAllPumpRecordByFuelCodeURL +"/"+params)
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
  creatPumbInventory(fuelType: pumberTypeSection, id: number) {

    return this.http.post(this.createPumbTypeURL + id, fuelType, { observe: 'response' })
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
  getPumbRecordById(id:number):Observable<any>{
    
    const params = id
    return this.http.get(this.getAllpumbRecordByIdURL+"/"+params)
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
