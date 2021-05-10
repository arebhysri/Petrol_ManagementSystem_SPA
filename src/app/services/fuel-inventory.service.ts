import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';

//import core
import { FuelInventory } from '../core/FuelInventory';
import * as globals from '../core/common';

@Injectable({
  providedIn: 'root'
})
export class FuelInventoryService {

  private createFuelInventoryURL = globals.baseServer + 'api/createfuelinventory/';
  private getAllRecordURL = globals.baseServer + 'api/getallrecord';
  private getSingleRecordById = globals.baseServer + 'api/getsinglerecordbyid';
  
  constructor(private http: HttpClient) { }

  //add fuel inventory details
  creatFuelInventory(fuelInventory: FuelInventory,id:number) {
    
    return this.http.post(this.createFuelInventoryURL + id, fuelInventory, { observe: 'response' })
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

  //get all record
  getAllRecord(): Observable<any> {
    return this.http.get(this.getAllRecordURL, { observe: 'response' })
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
  getRecordById(id:number):Observable<any>{
    
    const params = id
    return this.http.get(this.getSingleRecordById+"/"+params)
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
