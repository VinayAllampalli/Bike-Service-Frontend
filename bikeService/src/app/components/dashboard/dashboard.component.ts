import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 location = ["Select","Visakhapatnam"]
 CC =['100 CC','125 CC','150 CC','200 CC','220 CC','500 CC']
  form:any;
  name:any;
  x:any;
  currentDateTime:any;
  PickUptime: FormControl = new FormControl('');
  currentTime: any;
  selectedInTime: any;
  required: boolean = !1;
  bikes:any;
  currentDate: any;
  

  // currentDateTime =this.datepipe.transform((new Date), 'HH:mm');

  constructor(
    public datepipe: DatePipe,
    public router: Router,
    private fb: FormBuilder,
    private backend: BackendService,
    private ngxService:NgxUiLoaderService,
    public snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.formbuilder();
    this.bikeGet();
    this.name = localStorage.getItem('username');
    this.currentDateTime =this.datepipe.transform((new Date), 'HH:mm');
  
    console.log(typeof(this.currentDateTime));
  
    if(this.currentDateTime > '00:00' && this.currentDateTime < '12:00'){
      this.x = "Good Morning"
  
    }
    else if(this.currentDateTime >'12:01' && this.currentDateTime < '16:00'){
      this.x="Good Afternoon"
      
    }
    else if (this.currentDateTime > "16:01" && this.currentDateTime < '23:59'){
    this.x="Good Evening"
    }

    
      
  }

  formbuilder() {
    this.form = this.fb.group({
      location: ['', [Validators.required]],
      PickUpdate: ['', [Validators.required]],
      bikeName:['',[Validators.required]],
      Bike_CC:['',[Validators.required]],
      regNo:['',[Validators.required]],
      phonenumber: ['',[
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[1-9]{1}[0-9]{9}'),
        ]]
      
    });
  }

  submitform(){
    if (!this.form.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else{
      let temp = this.form.value;

    console.log('---', temp);
    let obj: any = {};
    obj.location = temp.location;
    obj.PickUpdate = temp.PickUpdate;
    obj.bikeName = temp.bikeName;
    obj.Bike_CC = temp.Bike_CC
    obj.regNo = temp.regNo;
    obj.phonenumber = temp.phonenumber;

    console.log('-----------------------------------', obj);
    this.backend.bookingDetails=obj;
    console.log("testsfs",this.backend.bookingDetails);
    localStorage.setItem('bikeName',obj.bikeName.bikeName);
    localStorage.setItem('regNo',obj.regNo)
    localStorage.setItem('Bike_CC',obj.Bike_CC)
    this.router.navigate(['header/ServicingList']);
    }

  } 
  bikeGet(){
    this.backend.getBikes().subscribe((res:any)=>{
      console.log("---->",res)
      this.bikes=res["data"];
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [' mm', 'm m m'],
    responsive: {
      0: {
        items: 0
      },
      400: {
        items: 0
      },
      740: {
        items: 0
      },
      940: {
        items: 0
      }
    },
    nav: true
  }


  }
  
