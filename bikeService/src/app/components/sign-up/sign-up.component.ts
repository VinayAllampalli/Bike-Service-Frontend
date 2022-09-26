import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { BackendService } from 'src/app/backend.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: any;
  hide = true;
  hide1 = true;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private backend: BackendService,
    private ngxService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.formbuilder()
  }
  formbuilder() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
          ),
        ],
      ],
    });
  }
  get username() {
    return this.form.get('username');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  submitform() {
    this.ngxService.start();
    if (!this.form.valid) {
      return;
    }
    let temp = this.form.value;
    let obj: any = {};
    obj.username = temp.username;
    obj.email = temp.email;
    obj.password = temp.password;
    this.backend.register(obj).subscribe(async (data) => {
      if (data == true) {
        this.form.reset();
      }
    });
    this.router.navigate(['login']);
    this.ngxService.stop();
  }
  

}
