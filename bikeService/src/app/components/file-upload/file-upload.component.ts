import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  images:any;
  userId:any;
  constructor(private backend: BackendService, public router:Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")
    
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
    console.log("--->",this.images)
    this.backend.fileupload(formData,this.userId).subscribe(res=>{
      console.log(res)
      this.router.navigate(["/login"])
    })
    


    
  }
}
