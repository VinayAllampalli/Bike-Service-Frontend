import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public bookingDetails:any;
  public servicingList:any;
  public types:any
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
  getEngineOil(){
    return this.http.get(`${environment.base_url}/getEngineOil`);
  }
  getBattery(){
    return this.http.get(`${environment.base_url}/getBattery`);
  }
  engineoil(obj: any){
    return this.http.post(`${environment.base_url}/engineOil`, obj, {})
  }
  battery(obj: any){
    return this.http.post(`${environment.base_url}/batteries`, obj, {})
  }
  bikeService(obj: any){
    return this.http.post(`${environment.base_url}/Services`, obj, {})
  }
  ServicePrice(list:any){
    let params = new HttpParams();
    params = params.append('services', list.join(', '));
  return this.http.get(`${environment.base_url}/ServicePrice`,{ params: params })

  }
}
