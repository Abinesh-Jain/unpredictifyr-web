import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get(`${environment.baseURL}cars`, {
      headers: {
        token: 'secret'
      }
    });
  }
}
