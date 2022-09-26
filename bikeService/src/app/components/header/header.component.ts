import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name:any;
  navToggle: boolean = true;
  isShowing = true;
  constructor(public route: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('username');
  }
  logout() {
    this.route.navigate(['/login']);
    localStorage.clear();
  }
  history(){
    this.route.navigate(['/usershistory']);
  }
  reg(){
    this.route.navigate(['/bikeregister']);

  

  }
  onChange(){
    this.isShowing=false
}
}
