import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {EmployeeDTO, ProjectDTO} from '../models/projectDTO';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';
import {UserTokenDto} from '../../auth/models/user-token-dto.model';
import {PaginatedProjectsDTO} from '../models/paginatedProjectsDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProjectById(id: number): Observable<ProjectDTO> {
    return this.http.get<ProjectDTO>(`http://localhost:8080/projects/${id}`);
  }

  addStage(id: number, stage: any): Observable<ProjectDTO> {
    return this.http.post<ProjectDTO>(`http://localhost:8080/projects/${id}/stages`, stage);
  }

  addEmployee(id: number, employee: any): Observable<ProjectDTO> {
    return this.http.post<ProjectDTO>(`http://localhost:8080/projects/${id}/employes`, employee);
  }

  findEmployeeByEmail(email: string): Observable<EmployeeDTO> {
    return this.http.get<EmployeeDTO>(`http://localhost:8080/employes/email/${email}`);
  }

}
