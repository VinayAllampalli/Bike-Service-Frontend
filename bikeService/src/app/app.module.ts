import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackendService } from './backend.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderHttpModule, SPINNER, POSITION, PB_DIRECTION, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ServicingListComponent } from './components/servicing-list/servicing-list.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AllFormsComponent } from './components/all-forms/all-forms.component';
import { SelectServiceComponent } from './components/select-service/select-service.component';
import { DailogueComponent } from './components/dailogue/dailogue.component';
import { CourselComponent } from './coursel/coursel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatStepperModule} from '@angular/material/stepper';
import { YourordersComponent } from './components/yourorders/yourorders.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MapsComponent } from './components/maps/maps.component';
import {NgxPrintModule} from 'ngx-print';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PushNotificationComponent } from './components/push-notification/push-notification.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';






const ngxUiLoaderConfig:NgxUiLoaderConfig =
{
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "red",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise-fade-rotating",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}




@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    ServicingListComponent,
    InvoiceComponent,
    AllFormsComponent,
    SelectServiceComponent,
    DailogueComponent,
    CourselComponent,
    YourordersComponent,
    ContactUsComponent,
    MapsComponent,
    PaymentComponent,
    ProfileComponent,
    EditProfileComponent,
    PushNotificationComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,    
    CarouselModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgbModule,
    MatStepperModule,
    NgxPrintModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [BackendService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
