import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { BackendService } from 'src/app/backend.service';
import { ConfirmedValidator } from './confirmed.validator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit,OnDestroy{
  hide = true;
  hide1 = true;
  form:any;
  userId:any;
  validate: any;
  filename: any;
  imageSrc:any;
  images:any;

  constructor( public router: Router,
    private fb: FormBuilder,
    private backend: BackendService,
    public snackbar: MatSnackBar) { }
  

  ngOnInit(): void {
    this.formbuilder()
    this.userId = localStorage.getItem("userId")
  }
  formbuilder() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['',[Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
      Cpassword:['',[Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
      // file:['',[Validators.required]]
      },{ 
        validator: ConfirmedValidator('password', 'Cpassword')
      })
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  get Cpassword(){
    return this.form.get('Cpassword');
  }
  // get file(){
  //   return this.form.get('file');
  // }
  
  image!: File;
fileUpload(event: any) {

  this.image = event.target.files[0];
  const reader = new FileReader()
  reader.readAsDataURL(this.image)
  console.log(this.image)
  reader.onload = () =>{
    this.imageSrc = reader.result as string;
    this.filename = this.image.name
    console.log("......",this.filename)
  }

}
selectImage(event:any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.images = file;
    console.log("--->",this.images.name)
  }
}
   
onSubmit(){
  const formData = new FormData();
  formData.append('file', this.images);
  formData.append("username",this.form.get('username')?.value)
  formData.append("password",this.form.get('password')?.value)

   


    // let temp = this.form.value;

    // let obj: any = {};
    // obj.username = temp.username;
    // obj.password = temp.password;
  
    // console.log("---->",obj)
   
// var formData:any = new FormData();

// // formData.append("file",this.filename)
// formData.append("username",this.form.get('username')?.value)
// formData.append("username",this.form.get('password')?.value)
// console.log('-----------------------------------', formData);
    
    this.backend.updateProfile(formData,this.userId).subscribe(async(res:any) => {
      const use = res
      this.validate = use.message
      if (use.success == true) {
        this.snackbar.open(use.message, 'ok', {
                    duration: 3000,
                    panelClass: ['blue-snackbar'],
                  }); 
                }
              })
              // this.router.navigate(["/login"])

  }
  ngOnDestroy(): void {
    
  }
  cancel(){
    this.router.navigate(["/editProfile"])
  }
}




