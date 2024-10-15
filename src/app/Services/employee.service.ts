import { HttpClient } from '@angular/common/http';
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
    return this.http.get<any>(this.apiBaseUrl + 'AllEmployees') ;
  }
  getDeletedEmployees():Observable<any>{
    return this.http.get<any>(this.apiBaseUrl + 'DeletedEmployees')
  }

  undeleteEmployee(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}UndeleteEmployee/${id}`, null); // Assuming it’s a POST request
  }
  

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiBaseUrl + 'AddEmployee', employee);
  }

  
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiBaseUrl}EditEmployee/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}DeleteEmployee/${id}`);
  }

  

  
}
