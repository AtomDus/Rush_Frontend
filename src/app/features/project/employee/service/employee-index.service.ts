import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeIndexService {

  constructor(private http: HttpClient) {}

  getEmployeesByProjectId(projectId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/api/projects/${projectId}/employees`);
  }

  removeEmployeeFromProject(projectId: number, employeeId: number): Observable<void> {
    return this.http.delete<void>(`/api/projects/${projectId}/employees/${employeeId}`);
  }
}
