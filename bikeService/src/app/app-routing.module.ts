import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
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
      }
  ]
},
{
  path:"footer",
  component:FooterComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
