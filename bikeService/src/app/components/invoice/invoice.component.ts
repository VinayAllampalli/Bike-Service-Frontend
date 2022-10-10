import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { BackendService } from 'src/app/backend.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class InvoiceComponent implements OnInit {
  location = ["Select","Visakhapatnam"];
  currentDate:any;
  bikeName:any;
  regNo:any;
  Bike_CC:any;
  loc:any;
  pickUpdate:any;
  Address:any;
  value:any;
  values:any;
  phoneNumber:any;
  firstFormGroup:any;
  secondFormGroup:any;
  price:any;
  prices:any;
  priceArray:any=[]
  allServices:any;
  services:any;
  total:any;
  userDetails:any;
  serviceList:any;
  Amount:any;

  constructor(private fb: FormBuilder,public backend:BackendService,public datepipe: DatePipe,) { }

  ngOnInit(): void {

    this.userDetails = this.backend.UserDetails;
    this.serviceList = this.backend.servicingList;
    this.Amount = this.backend.price;


    this.bikeName=localStorage.getItem('bikeName'),
    this.regNo=localStorage.getItem('regNo'),
    this.Bike_CC=localStorage.getItem('Bike_CC'),
    this.loc=localStorage.getItem('location');
    this.pickUpdate=localStorage.getItem('pickUpdate')
    this.Address=localStorage.getItem('Address')
    this.phoneNumber=localStorage.getItem('phonenumber')
    this.value=localStorage.getItem("Values")
    // this.allServices=localStorage.getItem("services")
    // this.services=this.allServices.split(',')
    this.values=this.value.split(",")
    this.price= localStorage.getItem("price")
    this.secondFormGroup
    console.log(this.values)
    this.amount()
    this.sum()
    // this.submit()
    this.backend.servicingList=this.values
    this.backend.price=this.total
  
  }
 
  amount(){
    this.prices=this.price.split(",")
    console.log("---",this.prices)
    length = this.prices.length;
    for (var i = 0; i < length; i++)
    this.priceArray.push(parseInt(this.prices[i]));
    console.log(this.priceArray);
  }
  sum(){
    let sum = 0;

for (const value of this.priceArray) {
  sum+= value;
}
console.log(sum);
this.total=sum
  }

submit(){
  // this.backend.servicingList=this.values
  // this.backend.price=this.total

  let obj: any = {};

  obj.userDetails=this.userDetails;
  obj.Amount=this.Amount
  obj.serviceList= this.serviceList

  // console.log("-----------------",obj)
  this.backend.alldata(obj).subscribe((data) => {
   console.log('--------', data);


})
}

  


}
