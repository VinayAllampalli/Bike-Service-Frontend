import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectServiceComponent } from '../select-service/select-service.component';


@Component({
  selector: 'app-dailogue',
  templateUrl: './dailogue.component.html',
  styleUrls: ['./dailogue.component.css']
})
export class DailogueComponent implements OnInit {
receviedRow:any
  constructor(
    public dialogRef:MatDialogRef<SelectServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.receviedRow=data
  }

  ngOnInit(): void {
  }

}
