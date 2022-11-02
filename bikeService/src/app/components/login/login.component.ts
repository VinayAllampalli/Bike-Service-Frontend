import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { combineLatest } from 'rxjs';
import { BackendService } from 'src/app/backend.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  email: any;
  token: any
  hide = true;
  hide1 = true;
  validate: any;
  log: any;
  errMessage: any;
  getUsers:any;
  imageBinary:any;


  constructor( public router: Router,
    private fb: FormBuilder,
    private backend: BackendService,
    private arouter: ActivatedRoute,
    public snackbar: MatSnackBar,
    private ngxService:NgxUiLoaderService) { 
  
    }

  ngOnInit(): void {
    this.formbuilder()
    combineLatest([this.arouter.params, this.arouter.queryParams])
      .subscribe(([params, queryParams]) => {
        console.log("---------->",this.arouter.queryParams)
        this.email = params['email'];
        this.token = params['token'];
        if (this.email && this.token) {
          this.VerifyToken();
        }
      });
  }
  VerifyToken(){
    console.log("---------->")
    this.backend.verifyMail(this.email, this.token).subscribe(async(data)=>{

    })
  }
  formbuilder() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$')],],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'),],],
    });
  }
  get Email() {

    return this.form.get('email');
  }
  get password() {
    return this.form.get('password')
  }
  submitform() {
    // this.ngxService.start();
    if (!this.form.valid) {
      this.snackbar.open('Please enter valid credentials', 'ok', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
    if (this.form.valid){
    let temp = this.form.value;
    let obj: any = {}
    let use: any = {};
    obj.email = temp.email
    obj.password = temp.password
    this.getUsers = this.backend.getUsers(obj.email).subscribe(async(data)=>{
      console.log("+++++++",data)
    })
    this.log = this.backend.login(obj).subscribe(async(res) => {
      use = res;
      // console.log("---->",use.message)
      this.validate = use.message
      if (use.success == true) {
        this.snackbar.open(use.message, 'ok', {
                    duration: 3000,
                    panelClass: ['blue-snackbar'],
                  }); 
        let user = use.obj.user
        this.backend.userId=user.userId
        console.log("----->",this.backend.userId)
        localStorage.setItem('email', user.email)
        localStorage.setItem('username', user.username)
        localStorage.setItem('userId',user.userId)
        let image =localStorage.setItem("image",user.file)
        console.log(image)
        this.router.navigate(["/header"]);
        // this.ngxService.stop();
              } 
        else if(use.success == false){}
                // this.ngxService.stop();
                console.log("---->",use.message)
                this.snackbar.open(use.message, 'ok', {

                  duration: 3000,
                  panelClass: ['blue-snackbar'],
                });
              
              
    });
    
  }
  }
  }
