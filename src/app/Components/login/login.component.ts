import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  // loginobj = new Loginclass();
  loginData = { email: '', password: '' };
  singnUpData = {firstName: '',lastName: '' ,userName: '',email: '' ,password: ''};

  
  constructor ( private authService : AuthService , private router : Router , private http : HttpClient ) {}
  

  onSubmitLogin() {
    //debugger;
    this.authService.login(this.loginData)
    .subscribe({
      next:(res)=> {
        alert("login success")  
        localStorage.setItem('Token' , res.token)
        this.router.navigate(['/mainPage']);
      },
      error:(err)=> {
          alert("invalid email or password.")
      },
    })

}
onSubmitSignUp()
{debugger;
  this.authService.signUp(this.singnUpData)
  .subscribe({
    next:(res)=> {
      alert("signUp Success")  
      localStorage.setItem('Token' , res.token)
      this.router.navigate(['/home']);      
    },
    error:(err)=> {
      alert(err.message)
  },
  })
}


}

// export class Loginclass{
//   username : string ;
//   password : string ;
//   //errorMessage : string ;

//   constructor(){
//     this.username='';
//     this.password='';
//   }
// 

