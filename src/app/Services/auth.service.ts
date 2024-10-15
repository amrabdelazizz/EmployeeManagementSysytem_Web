import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SrvRecord } from 'dns';
import { application, response } from 'express';
import { Observable, catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = 'https://localhost:7073/api/Auth/';

  
  constructor(private http:HttpClient) { }

  // login(credentials: {EmailId: string, Password: string }): Observable<any> {
  //   return this.http.post(this.apiUrl, credentials);

  
  // }
  login(credentials: {email: string, password: string }){
    return this.http.post<any>(`${this.apiBaseUrl}login`, credentials);
  }
  signUp(credentials:{firstName:string,lastName:string,userName:string,email:string , password:string })
  {
      return this.http.post<any>(`${this.apiBaseUrl}Register`,credentials);
  }
  isLoggedIn(): boolean {
    // Check if a token exists in localStorage (or sessionStorage)
    const token = localStorage.getItem('Token'); // Adjust this based on your token key
    return !!token; // Returns true if token exists
  }
}
