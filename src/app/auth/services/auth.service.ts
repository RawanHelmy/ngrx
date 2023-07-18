import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../types/register.interface';
import { Observable, map, tap } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.inteface';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { environment } from 'src/environments/environment';
import { LoginRequestInterface } from '../types/login.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  getUser(): Observable<CurrentUserInterface> {
    return this.http
      .get<AuthResponseInterface>(`${environment.backendURl}/user`)
      .pipe(map((res) => res.user));
  }
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(`${environment.backendURl}/users`, data)
      .pipe(map((res) => res.user));
  }
  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(
        `${environment.backendURl}/users/login`,
        data
      )
      .pipe(map((res) => res.user));
  }
}
