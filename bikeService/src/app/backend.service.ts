import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public bookingDetails:any;
  constructor(private http: HttpClient) { }
  
  register(obj: any) {
    const body = JSON.stringify(obj);
    return this.http.post(`${environment.base_url}/register`, obj, {})
  }
  login(obj: any) {
    return this.http.post(`${environment.base_url}/login`, obj)
  }
  verifyMail(email: any, token: any) {
    console.log("------>")
    return this.http.get(`${environment.base_url}/confirm/${email}/${token}`);
  }
  getUsers(email:any){
    return this.http.get(`${environment.base_url}/getUsers/${email}`);
  }
  getBikes(){
    return this.http.get(`${environment.base_url}/getBikes`);
  }
}
