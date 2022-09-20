import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-forms',
  templateUrl: './all-forms.component.html',
  styleUrls: ['./all-forms.component.css']
})
export class AllFormsComponent implements OnInit {
  form:any;
  form1:any;
  form2:any;

  constructor(public router: Router,
    private fb: FormBuilder,
    private backend: BackendService,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.formbuilder();
    this.formbuilder1();
    this.formbuilder2();
  }
  formbuilder() {
    this.form = this.fb.group({
      ServiceName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Price: ['', [Validators.required]]
    })
  }
  formbuilder1(){
    this.form1=this.fb.group({
      EngineOilName: ['', [Validators.required]],
      TankCapacity: ['', [Validators.required]],
      Price: ['', [Validators.required]]
    })
  }
  formbuilder2(){
    this.form2=this.fb.group({
      BatteryName: ['', [Validators.required]],
      Price: ['', [Validators.required]]
    })
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
      obj.ServiceName = temp.ServiceName;
      obj.Description = temp.Description;
      obj.Price = temp.Price;
      this.backend.bikeService(obj).subscribe(async(data:any) => {
        this.snackbar.open(data.message, 'ok', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
        });
        
          this.form.reset();
          if(data.success==false){
            this.snackbar.open(data.message, 'ok', {
              duration: 3000,
              panelClass: ['blue-snackbar'],
            });
          }
        
      });

    }

  }
  EngineOil(){
    if (!this.form1.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else{
      let temp = this.form1.value;

      console.log('---', temp);
      let obj: any = {};
      obj.EngineOilName = temp.EngineOilName;
      obj.TankCapacity = temp.TankCapacity;
      obj.Price = temp.Price;
      this.backend.engineoil(obj).subscribe(async (data:any) => {
        console.log("---->",data)
        this.snackbar.open(data.message, 'ok', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
        });
       
          this.form1.reset();
        
      });
    }


  }
  Battery(){
    if (!this.form2.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else{
      let temp = this.form2.value;

      console.log('---', temp);
      let obj: any = {};
      obj.BatteryName = temp.EngineOilName;
      obj.Price = temp.Price;
      this.backend.battery(obj).subscribe(async (data:any) => {
        this.snackbar.open(data.message, 'ok', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
        });
          this.form2.reset();
        
      });
    }

  }

}
