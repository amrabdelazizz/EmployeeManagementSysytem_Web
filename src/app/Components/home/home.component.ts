import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { response } from 'express';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  urlData = { url: '' };
  submittedUrl: string | null = null;
  shortUrl : string = '';


  

  constructor ( private httpClient: HttpClient , router:Router){}
  onSubmit(form: any) {
    debugger;
    if (form.valid) {
      this.submittedUrl = this.urlData.url; 
      this.PostLongUrl().
      subscribe({
        next:(res)=> {
          //alert(res.shortUrl)  
          this.shortUrl = res.shortUrl;
      
        },
        error:(err)=> {
            alert("not authenticated")
        },
      })
        
    }
  }
  
  PostLongUrl() 
  {
    //let token = this.myToken
    let token = localStorage.getItem('Token')
    let headObj = new HttpHeaders().set("Authorization" , "bearer "+token)
    return this.httpClient.post<any>('https://localhost:7238/api/Urls' ,this.urlData , {headers:headObj} );
  }
}
