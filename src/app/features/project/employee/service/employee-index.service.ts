import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Employee} from '../model/employeeDTO-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeIndexService {

  constructor(private http: HttpClient) {}

  getEmployeesByProjectId(projectId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.API_URL}/projects/${projectId}/employees`);
  }

  removeEmployeeFromProject(projectId: number, employeeId: number): Observable<void> {
    return this.http.delete<void>(`${environment.API_URL}/projects/${projectId}/employees/${employeeId}`);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.API_URL}/employees`);
  }
}
