import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  getProjectsByUserId(userId: number) {
    return this._http.get<any>(`${environment.API_URL}/projects/by-responsable/${userId}`);
  }

  createProject(project: any) {
    return this._http.post<any>(`${environment.API_URL}/projects/add`, project);
  }
}
