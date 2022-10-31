import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../environments/environment";

function _window():any{
  return _window;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  get nativeWindow():any{
    return _window
  }

  public UserDetails:any;
  public servicingList:any;
  public price:any;
  public EngineOil:any;
  public Battery:any;
  public userId:any;


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
  getBattery(){
    return this.http.get(`${environment.base_url}/getBattery`);
  }
  engineoil(obj: any){
    return this.http.post(`${environment.base_url}/Oils`, obj, {})
  }
  battery(obj: any){
    return this.http.post(`${environment.base_url}/batteries`, obj, {})
  }
  bikeService(obj: any){
    return this.http.post(`${environment.base_url}/Services`, obj, {})
  }
  getService(){
    return this.http.get(`${environment.base_url}/getServices`);
  }
  ServicePrice(list:any){
    let params = new HttpParams();
    params = params.append('services', list.join(', '));
  return this.http.get(`${environment.base_url}/ServicePrice`,{ params: params })

  }
  alldata(obj:any){
    return this.http.post(`${environment.base_url}/userBooking`, obj)
  }
  getEngineOil(){
    return this.http.get(`${environment.base_url}/getEngineOil`);
  }
  getBookingdata(userID:any){
    return this.http.get(`${environment.base_url}/getBookData/${userID}`);
  }
  contact(obj:any){
    return this.http.post(`${environment.base_url}/contactUs`, obj)
  }
  updateProfile(userId:any,obj:any){
    return this.http.put(`${environment.base_url}/UpdateProfile/${userId}`,obj);
  }
}
