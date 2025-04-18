import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashService {


  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  getPendingProjects() {
    return this._http.get<any>(`${environment.API_URL}/projects/pending`);
  }

  getOpenProjects() {
    return this._http.get<any>(`${environment.API_URL}/projects/open`);
  }

  getClosedProjects() {
    return this._http.get<any>(`${environment.API_URL}/projects/closed`);
  }

  createProject(project: any) {
    return this._http.post<any>(`${environment.API_URL}/projects/add`, project);
  }


}
