import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    const token = localStorage.getItem('accessToken');

    return this.http.get(`${environment.baseURL}users`, {
      headers: {
        authorization: token ? 'Bearer ' + JSON.parse(token) : '',
      }
    });
  }
}
