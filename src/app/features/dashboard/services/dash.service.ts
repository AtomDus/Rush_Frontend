import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _authService: AuthService = inject(AuthService);

  constructor() { }

  getPendingProjects() {
    const userId = this._authService.currentUser()?.user.id;
    if (!userId) {
      throw new Error('Utilisateur non connecté');
    }
    return this._http.get<any>(
      `${environment.API_URL}/projects/by-responsable/${userId}/pending?page=1&size=10&sort=id`
    );
  }

  getOpenProjects() {
    const userId = this._authService.currentUser()?.user.id;
    if (!userId) {
      throw new Error('Utilisateur non connecté');
    }
    return this._http.get<any>(
      `${environment.API_URL}/projects/by-responsable/${userId}/open?page=1&size=10&sort=id`
    );
  }

  getClosedProjects() {
    const userId = this._authService.currentUser()?.user.id;
    if (!userId) {
      throw new Error('Utilisateur non connecté');
    }
    return this._http.get<any>(
      `${environment.API_URL}/projects/by-responsable/${userId}/closed?page=1&size=10&sort=id`
    );
  }

  createProject(project: any) {
    return this._http.post<any>(`${environment.API_URL}/projects/add`, project);
  }
}
