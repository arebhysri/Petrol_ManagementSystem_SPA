import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserDetail } from 'src/app/core/IUserDetail';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  username: string = '';
  password: string = '';
  userDetails: IUserDetail[] = [];
  getLogin: IUserDetail[] = [];
  alert: string = 'Fill required field'
  showAlert: boolean = false;
  adminRole : string = '';

  constructor(private userLoginServices: UserLoginService, public router: Router) { }

  ngOnInit(): void {
    this.userDetails = [
      { Id: 1, UserName: 'Admin', Password: 'admin', Role: 'Admin' }
    ]
  }

  //login user
  loginSys(userName: string, password: string) {

    if (userName && password) {
      this.username = userName;
      this.password = password;
      this.userLoginServices.loginUser(this.username, this.password).subscribe(data => {
        if (data) {
          console.log("succuss");
          localStorage.setItem('userName', data[0].UserName);
          localStorage.setItem('role',data[0].Type);
          this.router.navigate(['allFualRecord']);
        }
      })
    }
    else {
      this.showAlert = true;
    }
  }
}
