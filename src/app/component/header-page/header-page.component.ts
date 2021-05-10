import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent implements OnInit {
  userName:any='';
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
  }

  //logout
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);

  }
}
