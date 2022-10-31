import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  name:any;
  email:any;

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.name=localStorage.getItem("username");
    this.email=localStorage.getItem("email")
  }
edit(){
  this.dialog.open(EditProfileComponent, {
    width: '500px',
})
}
}

