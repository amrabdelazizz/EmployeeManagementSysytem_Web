import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  employeeID:number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber:string;
  jobTitle:string;
  hireDate:string;
  isDeleted:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiBaseUrl = 'https://localhost:7073/api/Employee/';
  

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<any> {
    let token = localStorage.getItem('Token')
    let headObj = new HttpHeaders().set("Authorization" , "bearer "+token)
    return this.http.get<any>(this.apiBaseUrl + 'AllEmployees' , {headers:headObj}) ;
  }
  getDeletedEmployees():Observable<any>{
    let token = localStorage.getItem('Token')
    let headObj = new HttpHeaders().set("Authorization" , "bearer "+token)
    return this.http.get<any>(this.apiBaseUrl + 'DeletedEmployees' ,{headers:headObj})
  }

  undeleteEmployee(id: number): Observable<any> {
    let token = localStorage.getItem('Token')
    let headObj = new HttpHeaders().set("Authorization" , "bearer "+token)
    return this.http.post<any>(`${this.apiBaseUrl}UndeleteEmployee/${id}`, {},{headers:headObj}); // Assuming it’s a POST request
  }
  

  addEmployee(employee: Employee): Observable<Employee> {
    let token = localStorage.getItem('Token')
    let headObj = new HttpHeaders().set("Authorization" , "bearer "+token)
    return this.http.post<Employee>(this.apiBaseUrl + 'AddEmployee', employee ,{headers:headObj});
  }

  
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    let token = localStorage.getItem('Token')
    let headObj = new HttpHeaders().set("Authorization" , "bearer "+token)
    return this.http.put<Employee>(`${this.apiBaseUrl}EditEmployee/${id}`, employee ,{headers:headObj});
  }

  deleteEmployee(id: number): Observable<void> {
    let token = localStorage.getItem('Token')
    let headObj = new HttpHeaders().set("Authorization" , "bearer "+token)
    return this.http.delete<void>(`${this.apiBaseUrl}DeleteEmployee/${id}` , {headers:headObj});
  }

  

  
}
