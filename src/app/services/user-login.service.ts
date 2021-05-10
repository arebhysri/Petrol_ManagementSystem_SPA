import { Injectable } from '@angular/core';
import * as globals from '../core/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, delay} from 'rxjs/operators';

//import core class
import { IUserDetail } from '../core/IUserDetail';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private getUserLoginURL = globals.baseServer + 'api/loginsystem/';
  constructor(private http: HttpClient) { }

  //login user
  loginUser(username: string,password:string): Observable<any> {
    let params1 = "username/" + username;
    let param2 = "/password/" + password;
    debugger
    return this.http.get(this.getUserLoginURL + params1 + param2)
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
