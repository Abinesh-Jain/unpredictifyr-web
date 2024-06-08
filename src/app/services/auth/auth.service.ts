import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${environment.baseURL}auth/login`, { email, password }, {
      headers: {
        token: 'secret'
      }
    });
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post(`${environment.baseURL}auth/sign-up`, { name, email, password }, {
      headers: {
        token: 'secret'
      }
    });
  }
}
