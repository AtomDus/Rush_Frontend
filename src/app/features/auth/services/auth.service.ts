import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterFormModel} from '../models/register-form.model';
import {environment} from '../../../../environments/environment';
import {LoginFormModel} from '../models/login-form.model';
import {UserTokenDto} from '../models/user-token-dto.model';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _http: HttpClient = inject(HttpClient);

  currentUser: WritableSignal<UserTokenDto|undefined>;

  constructor() {
    let jsonUser = localStorage.getItem('currentUser');
    this.currentUser = signal(jsonUser ? JSON.parse(jsonUser) : undefined);
  }

  register(form: RegisterFormModel) {
    return this._http.post<void>(`${environment.API_URL}/auth/register`,form);
  }

  login(form: LoginFormModel) {
    return this._http.post<UserTokenDto>(`${environment.API_URL}/auth/login`,form).pipe(
      tap(result => {
        this.currentUser.set(result);
        localStorage.setItem("currentUser", JSON.stringify(result));
      }),
    );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUser.set(undefined);
  }

}
