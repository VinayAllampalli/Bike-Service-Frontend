import { Component, OnInit } from '@angular/core';
import { OneSignal } from 'onesignal-ngx';
@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.css']
})
export class PushNotificationComponent implements OnInit {

  constructor(private oneSignal: OneSignal) { 
    this.oneSignal.init({
      appId: "0284b38e-fd6d-4d0e-b075-ed568dfbfcb5",
    });
  }
  // please add  "assets": ["src/OneSignalSDKWorker.js"] in angular.json  
  ngOnInit(): void {
    
  }

}
