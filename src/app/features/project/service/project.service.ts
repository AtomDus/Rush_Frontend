import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ProjectDTO} from '../models/projectDTO';
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

  // Appel API pour récupérer les informations de l'utilisateur par ID
  getUserById(userId: number): Observable<UserTokenDto> {
    return this.http.get<UserTokenDto>(`http://localhost:8080/users/${userId}`);
  }

  // Appel API pour récupérer les projets de l'utilisateur par ID
  getProjectsByUserId(userId: number): Observable<PaginatedProjectsDTO> {
    return this.http.get<PaginatedProjectsDTO>(`http://localhost:8080/projects/by-responsable/${userId}`);
  }

}
