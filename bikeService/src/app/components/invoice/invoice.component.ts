import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BackendService } from 'src/app/backend.service';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
declare var Razorpay:any;


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class InvoiceComponent implements OnInit {
  location = ["Select", "Visakhapatnam"];
  currentDate: any;
  bikeName: any;
  regNo: any;
  Bike_CC: any;
  loc: any;
  pickUpdate: any;
  Address: any;
  value: any;
  values: any;
  phoneNumber: any;
  firstFormGroup: any;
  secondFormGroup: any;
  price: any;
  prices: any;
  priceArray: any = [];
  allServices: any;
  services: any;
  total: any;
  userDetails: any;
  serviceList: any;
  EngineOilPrice:any;
  BatteryPrice:any;
  BatteryName:any;
  EngineOilName:any;
  userID:any;
  paymentId="";
  error=""
  message:string="";
  Amount:any;


  constructor(private fb: FormBuilder, public backend: BackendService, public datepipe: DatePipe,public route:Router) { }

  ngOnInit(): void {

    this.userDetails = this.backend.UserDetails;
    this.serviceList = this.backend.servicingList; 
    this.userID=this.backend.userId
    this.bikeName = localStorage.getItem('bikeName'),
    this.regNo = localStorage.getItem('regNo'),
    this.Bike_CC = localStorage.getItem('Bike_CC'),
    this.loc = localStorage.getItem('location');
    this.pickUpdate = localStorage.getItem('pickUpdate') 
    this.Address = localStorage.getItem('Address')
    this.phoneNumber = localStorage.getItem('phonenumber')
    this.value = localStorage.getItem("Values")
    this.values = this.value.split(",")
    this.price = localStorage.getItem("price")
    this.EngineOilPrice=localStorage.getItem("engineoilPrice")
    this.BatteryPrice=localStorage.getItem("batteryPrice")
    this.EngineOilName=localStorage.getItem("engineoil")
    this.BatteryName=localStorage.getItem("battery")
    this.secondFormGroup
    console.log(this.values)
    this.amount()
    this.sum()
    // this.submit()
    this.backend.servicingList = this.values
    this.backend.EngineOil=this.EngineOilName
    this.backend.Battery=this.BatteryName
    this.backend.price = this.total
  }
  amount() {
    this.prices = this.price.split(",")
    console.log("---", this.prices)
    length = this.prices.length;
    for (var i = 0; i < length; i++)
      this.priceArray.push(parseInt(this.prices[i]));
    console.log(this.priceArray);
  }
  sum() {
    let sum = 0;
    
    for (const value of this.priceArray) {
      sum += value
    }
    console.log(sum);
    this.total = sum + parseInt(this.EngineOilPrice) + parseInt(this.BatteryPrice)
    localStorage.setItem("total",this.total)
    this.Amount = this.total*100
  }
  submit() {
    // this.backend.servicingList=this.values
    // this.backend.price=this.total
    let obj: any = {};
    obj.userDetails = this.userDetails;
    obj.Amount = this.backend.price;
    obj.serviceList = this.serviceList;
    obj.userID=this.userID
    obj.Battery=this.BatteryName;
    obj.EngineOil=this.EngineOilName;
    console.log("-----------------",obj)
    this.backend.alldata(obj).subscribe((data) => {
      console.log('--------', data);
    })
  }

  options = {

    "key": "rzp_test_mW5VdQK5oOJWDl",

    "amount": "200",

    "name":  localStorage.getItem("username"),

    "description": "Web Development",

    "image": "",

    "order_id":"",

    "handler": function (response: any){

        var event = new CustomEvent("payment.success",

            {

                detail: response,

                bubbles: true,

                cancelable: true

            }

        );

        window.dispatchEvent(event);

    }

    ,

    "prefill": {

    "name": localStorage.getItem("username"),

    "email": localStorage.getItem("email"),

    "contact": this.backend.UserDetails.phonenumber

    },

    "notes": {

    "address": ""

    },

    "theme": {

    "color": "#3399cc"

    }

    };
   
  pay(){
    this.paymentId = '';

    this.error = '';

      this.options.amount ="200"; //paise

      this.options.prefill.name = localStorage.getItem("username");

      this.options.prefill.email = localStorage.getItem("email");

      this.options.prefill.contact = this.backend.UserDetails.phonenumber;

      var rzp1 = new Razorpay(this.options);

      rzp1.open();

      rzp1.on('payment.failed', function (response: any){
      //  this.message=""

          // Todo - store this information in the server

          console.log(response.error.code);

          console.log(response.error.description);

          console.log(response.error.source);

          console.log(response.error.step);

          console.log(response.error.reason);

          console.log(response.error.metadata.order_id);

          console.log(response.error.metadata.payment_id);

          //this.error = response.error.reason;

      }

  );
  }
  @HostListener('window:payment.success', ['$event'])

  onPaymentSuccess(event: any): void {

     this.message = "Success";

  }
  Cancel(){
    this.route.navigate(["/header/dashboard"])
  }


}


