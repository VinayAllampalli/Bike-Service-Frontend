import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-servicing-list',
  templateUrl: './servicing-list.component.html',
  styleUrls: ['./servicing-list.component.css']
})
export class ServicingListComponent implements OnInit {
  BikeName:any;
  Bike_CC:any;
  BIke_RegNo:any;
  list:any=[];
  oil:any;
  form:any;
  batteries:any;
  type:any;


  constructor(  public router: Router,
    private fb: FormBuilder,
    private backend: BackendService,
    private ngxService:NgxUiLoaderService,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.BikeName=localStorage.getItem('bikeName');
    this.Bike_CC=localStorage.getItem('Bike_CC');
    this.BIke_RegNo=localStorage.getItem('regNo');
    // this.engineoil();
    this.formbuilder();
    // this.battery();
  }
 
  submit(){

    if(this.list.length==0){
      console.log("------>")
      this.snackbar.open('Please Select Atleast one service', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    else{
      let temp = this.form.value;
      let obj: any = {};
      obj.oilName = temp.oilName;
      obj.Battery = temp.Battery;
      // this.backend.servicingList=this.list;
      // this.backend.types=obj
      console.log("___",this.list)
      // this.backend.ServicePrice(this.list).subscribe((res:any)=>{
      //   console.log("------->",res)
      // })

      // console.log("++++",this.backend.servicingList)
      // console.log("___>",this.backend.types)
      localStorage.setItem('serviceList',this.list)
      // this.router.navigate(['header/invoice'])
    }
  }


onchange(checkbox:any){
  // console.log("----->",checkbox.source.value)
  if(checkbox.checked==true){
  this.list.push(checkbox.source.value)
  // console.log("----->",this.list)
  }
  else if (checkbox.checked==false){
    let index = this.list.indexOf(checkbox.source.value);
    if (index > -1) {
    this.list.splice(index,1)
    }
    // this.list.index(checkbox.source.value)
    // console.log(this.list)
    // console.log("please select the service")
  }
}
info(value:any){
  console.log("------->",value)
}
// engineoil(){
//   this.backend.getEngineOil().subscribe((res:any)=>{
//     console.log("---->",res)
//     this.oil=res["data"];
   
//   })
// }
// battery(){
//   this.backend.getBattery().subscribe((res:any)=>{
//     console.log("---->",res)
//     this.batteries=res["data"];
//   })
// }
formbuilder() {
  this.form = this.fb.group({
    oilName:[],
    Battery:[]

  })
  }

}
