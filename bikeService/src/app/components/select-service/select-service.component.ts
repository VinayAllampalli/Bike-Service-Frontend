import { Component, OnInit, ViewChild, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { DailogueComponent } from '../dailogue/dailogue.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.css']
})
export class SelectServiceComponent implements OnInit {
  
  displayedColumns: string[] =['Select','ServiceName','Description','Options','Price']
  services: any = []
  companyArr: any = [];
  tableData: any;
  selection = new SelectionModel<any>(true);
  dataSource = new MatTableDataSource<any>(this.services);
  value:any;
  searchedText: String = '';
  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort)sort:any= MatSort 
  BikeName:any;
  Bike_CC:any;
  BIke_RegNo:any;
  battery :any
  list:any=[];
  service:any=[];
  form:any;
  mount:any;
  nameList:any=[];
  name:any;


  constructor(private backend: BackendService, private fb: FormBuilder,  public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.formbuilder();
    this.bikeget()
    this.BikeName=localStorage.getItem('bikeName');
    this.Bike_CC=localStorage.getItem('Bike_CC');
    this.BIke_RegNo=localStorage.getItem('regNo');
    
  }
  ngAfterViewInit() {
    this.companyArr.paginator = this.paginator;
    this.companyArr.sort = this.sort;
  }
  openDialog(): void {
    this.dialog.open(DailogueComponent, {
        width: '250px',
      
      });
    }
  formbuilder() {
    this.form = this.fb.group({
      element: [''],
    })}

  bikeget(){
  this.backend.getService().subscribe((res:any)=>{
   console.log("--->",res)
   this.companyArr=res.data
  this.battery=res["data"]
  console.log("+++++++++",this.battery)
  this.name = this.battery.filter((todo:any)=>{
    return todo.ServiceName==="BatteryChange"
  })
  console.log("------>",this.name)

  for(let bat of this.battery){
   this.mount =bat.Battery
   console.log(">>>>>>>",this.nameList)

  //  if(this.nameList.Included('Battery')){
  //   console.log("Sucesss")
  //  }
  //  else{
  //   console.log("FAIL")
  //  }
   
    // console.log(">>>>>>>>>",this.name.BatteryChange)
  //   for(let x of i){
  // console.log("----->",x.BatteryName)
  // this.mount = x.BatteryName
  // console.log(">>>>>>>>>>>>>>>",this.mount)
  // }
}
  console.log("+++++",this.battery)
   this.companyArr = new MatTableDataSource(this.companyArr);
  }
  )}
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  logSelection() {
  this.selection.selected.forEach((res:any) =>
  // console.log(res)
    this.list.push(res))
    for(let list of this.list){
      this.service.push(list.ServiceName,list.Price,list.Options["BatteryName"])
      localStorage.setItem("Values",this.service)
      console.log("---->",this.service)
    
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companyArr.filter = filterValue.trim().toLowerCase();
  }
  //-------------------------------------------clear ----------------------------------------//
  clear() {
    this.searchedText = '';
  }
 

}
