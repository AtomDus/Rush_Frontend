import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Equipement} from '../model/equipementDTO-model';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  constructor(private http: HttpClient) {}

  getEquipements(page: number = 1, size: number = 10, sort: string = 'id'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<any>(`${environment.API_URL}/projects/{id}`, { params });
  }

  getEquipementById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${environment.API_URL}/equipements/{id}`);
  }

  addEquipement(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.post<Equipement>(`${environment.API_URL}/{id}/equipements`, equipement);
  }

  updateEquipement(id: number, equipement: Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${environment.API_URL}/equipements/{id}`, equipement);
  }

  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.API_URL}/equipements/{id}`);
  }

  getRentingCompanyByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.get<any>(`${environment.API_URL}/renting-company/name/${params}`);
  }
}
