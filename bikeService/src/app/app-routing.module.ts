import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AllFormsComponent } from './components/all-forms/all-forms.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DailogueComponent } from './components/dailogue/dailogue.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { MapsComponent } from './components/maps/maps.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PushNotificationComponent } from './components/push-notification/push-notification.component';
import { SelectServiceComponent } from './components/select-service/select-service.component';
import { ServicingListComponent } from './components/servicing-list/servicing-list.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { YourordersComponent } from './components/yourorders/yourorders.component';
import { CourselComponent } from './coursel/coursel.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
{
  path:'',
  redirectTo:'login',
  pathMatch:"full"
},
{
  path:"login",
  component:LoginComponent
},
{
  path:"signUp",
  component:SignUpComponent
},
{
  path:"confirm/:email/:token",
  component:LoginComponent
},

{
  path:"header",
  component:HeaderComponent,children:[
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:"full"
      },
      {
        path:'dashboard',
        component:DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'about',
        component:AboutComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'ServicingList',
        component:ServicingListComponent,
        canActivate:[AuthGuard]

      },
      {
        path:'invoice',
        component:InvoiceComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'allforms',
        component:AllFormsComponent,
        canActivate:[AuthGuard]
      },{
        path:'selectService',
        component:SelectServiceComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'dailogue',
        component:DailogueComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'orders',
        component:YourordersComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'ContactUs',
        component:ContactUsComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"maps",
        component:MapsComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"payment",
        component:PaymentComponent,
        canActivate:[AuthGuard]

      },
      {
        path:"profile",
        component:ProfileComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"editProfile",
        component:EditProfileComponent,
        canActivate:[AuthGuard]
      },
      {
        path:"pushNotification",
        component:PushNotificationComponent,
        canActivate:[AuthGuard]
      }
  ]
},
{
  path:"footer",
  component:FooterComponent
},
{
  path:'coursel',
  component:CourselComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
