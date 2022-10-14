import { Component, OnInit, HostListener } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
declare var Razorpay:any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentId="";
  error=""
  message:string="";
  
  constructor(private backend:BackendService) { }

  ngOnInit(): void {

  }

  options = {

    "key": "rzp_test_mW5VdQK5oOJWDl",

    "amount": "200",

    "name": "",

    "description": "Web Development",

    "image": "",

    "order_id":"",

    "handler": function (response: any){

        var event = new CustomEvent("payment.success",

            {

                detail: response,

                bubbles: true,

                cancelable: true

            }

        );

        window.dispatchEvent(event);

    }

    ,

    "prefill": {

    "name": "",

    "email": "",

    "contact": ""

    },

    "notes": {

    "address": ""

    },

    "theme": {

    "color": "#3399cc"

    }

    };
   
  pay(){
    this.paymentId = '';

    this.error = '';

      this.options.amount = "200"; //paise

      this.options.prefill.name = "Vinay";

      this.options.prefill.email = "samplemailid705@gmail.com";

      this.options.prefill.contact = "7093116069";

      var rzp1 = new Razorpay(this.options);

      rzp1.open();

      rzp1.on('payment.failed', function (response: any){
      //  this.message=""

          // Todo - store this information in the server

          console.log(response.error.code);

          console.log(response.error.description);

          console.log(response.error.source);

          console.log(response.error.step);

          console.log(response.error.reason);

          console.log(response.error.metadata.order_id);

          console.log(response.error.metadata.payment_id);

          //this.error = response.error.reason;

      }

  );
  }
  @HostListener('window:payment.success', ['$event'])

  onPaymentSuccess(event: any): void {

     this.message = "Success";

  }

}
