import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Component({
  selector: 'app-yourorders',
  templateUrl: './yourorders.component.html',
  styleUrls: ['./yourorders.component.css']
})
export class YourordersComponent implements OnInit {
  userID:any;
  ELEMENT_DATA: any =[]
  dataSource: any;
  bookData:any;
  public displayedColumns = ['BikeName', 'Reg No', 'Order Date', 'Phone No','Selected Service','Address', 'Amount']
  constructor(public backend:BackendService) { }

  ngOnInit(): void {
    this.userID=localStorage.getItem("userId")
    console.log("????",this.userID)
    this.bookdata()
  }
  bookdata(){
    this.backend.getBookingdata(this.userID).subscribe(data=>{
      console.log("---->",data)
      this.ELEMENT_DATA = data;
      this.dataSource = this.ELEMENT_DATA.getData
      
    })
  }

}
