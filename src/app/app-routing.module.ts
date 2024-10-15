import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path : 'login' , component:LoginComponent },
  //{ path : 'home' , component:HomeComponent , canActivate: [AuthGuard]},
  {path : 'mainPage' , component:MainPageComponent , canActivate: [AuthGuard]},
  
  { path : '' , redirectTo : '/login' , pathMatch : 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
