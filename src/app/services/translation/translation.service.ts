import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getLanguages() {
    return this.http.get(`${environment.baseURL}translate`);
  }

  getTranslation(text: string, language = 'en') {
    return this.http.get(`${environment.baseURL}translate/${text}?lang=${language}`);
  }
}
