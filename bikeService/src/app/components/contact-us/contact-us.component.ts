import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BackendService } from 'src/app/backend.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  form:any;

  constructor(public fb:FormBuilder,public snackbar: MatSnackBar,public backend:BackendService) { }

  ngOnInit(): void {
    this.formbuilder()

  }
  formbuilder() {
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')]],
      Feedback: ['', [Validators.required]]
    })
  }
  submit(){
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
      obj.Name = temp.Name;
      obj.email = temp.email;
      obj.Feedback = temp.Feedback;
      obj.userId = localStorage.getItem("userId")
      this.backend.contact(obj).subscribe(data=>{
        console.log(data)
        this.form.reset();
      })
      
    }


  }

}
