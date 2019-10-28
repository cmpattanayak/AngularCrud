import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { EmployeeModel } from './employeemodel';
import { Department } from './employee.dept';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    url = 'http://localhost/AngularCrudApi/api/employee';

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<EmployeeModel[]> {
      return this.http.get<EmployeeModel[]>(this.url + '/employees');
    }

    getEmployeeById(employeeId: number): Observable<EmployeeModel> {
      const newUrl = this.url + '/employee-by-id/' + employeeId;
      return this.http.get<EmployeeModel>(newUrl);
    }
    createEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<EmployeeModel>(this.url + '/new-employee/', employee, httpOptions);
    }

    updateEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.put<EmployeeModel>(this.url + '/save-employee/', employee, httpOptions);
    }

    deleteEmployeeById(employeeid: number): Observable<number> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.delete<number>(this.url + '/delete-employee/' + employeeid, httpOptions);
    }

    getDepartments(): Observable<Department[]> {
      return this.http.get<Department[]>(this.url + '/departments');
    }
  }
