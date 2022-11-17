import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectServiceComponent } from '../select-service/select-service.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dailogue',
  templateUrl: './dailogue.component.html',
  styleUrls: ['./dailogue.component.css']
})
export class DailogueComponent implements OnInit {
receviedRow:any
  constructor(
    public router:Router, 
    public dialogRef:MatDialogRef<SelectServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.receviedRow=data
  }

  ngOnInit(): void {
  }
Ok(){
  this.router.navigate(["header/selectService"])
}
}
