import { Component, OnInit, ViewChild, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { DailogueComponent } from '../dailogue/dailogue.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.css']
})
export class SelectServiceComponent implements OnInit {

  displayedColumns: string[] = ['Select', 'ServiceName', 'Description', 'Options', 'Price']
  services: any = []
  companyArr: any = [];
  tableData: any;
  selection = new SelectionModel<any>(true);
  dataSource = new MatTableDataSource<any>(this.services);
  value: any;
  searchedText: String = '';
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort
  BikeName: any;
  Bike_CC: any;
  BIke_RegNo: any;
  battery: any
  list: any = [];
  service: any = [];
  price:any=[];
  form: any;
  selectedRow:any;
  servicePrice:any=[];




  constructor(private backend: BackendService, 
    private fb: FormBuilder, 
    public dialog: MatDialog,
    public route:Router) {

  }

  ngOnInit(): void {
    this.formbuilder();
    this.bikeget()
    this.BikeName = localStorage.getItem('bikeName');
    this.Bike_CC = localStorage.getItem('Bike_CC');
    this.BIke_RegNo = localStorage.getItem('regNo');
    this.companyArr.paginator = this.paginator;
    this.companyArr.sort = this.sort;

  }
  // ngAfterViewInit() {
    
  // }
  openDialog(): void {
    this.dialog.open(DailogueComponent, {
      width: '250px',
      data:{
        ServiceName :this.selectedRow.ServiceName,
        Description: this.selectedRow.Description
      }
    });
  }
  formbuilder() {
    this.form = this.fb.group({
      EngineOil: [''],
      Battery:['']
    })
  }

  bikeget() {
    this.backend.getService().subscribe((res: any) => {
      console.log("--->", res)
      this.companyArr = res.data
      console.log(this.companyArr["ServiceName"])
      for(let x of this.companyArr){
        console.log(x.ServiceName)
      }
      this.companyArr = new MatTableDataSource(this.companyArr);
    }
    )
  }
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
    this.selection.selected.forEach((res: any) =>
      //  console.log(res.ServiceName))
      this.list.push(res))
    for (let list of this.list) {
      // this.servicePrice.push(`${list.ServiceName} - ${list.Price}`)
      this.service.push(list.ServiceName)
      this.price.push(list.Price)
      localStorage.setItem("Values", this.service)
      localStorage.setItem("price",this.price)
   
      // localStorage.setItem("services",this.servicePrice)
      // console.log("---->", this.service)
      this.route.navigate(["/header/invoice"])
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
  selected(row: any) {
     this.selectedRow = row
     console.log(this.selectedRow)
   
  }


}
