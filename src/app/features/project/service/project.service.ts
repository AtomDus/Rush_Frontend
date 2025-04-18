import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ProjectDTO} from '../models/projectDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  getProjectsById(id: number) {
    return this._http.get<ProjectDTO>(`${environment.API_URL}/projects/{id}`);
  }
}
