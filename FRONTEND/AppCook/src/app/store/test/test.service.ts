import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) {}

  urlBase = environment.api;

  /*
  * Appel test vers l'api
  * retourne un string
  */
  test(): Observable<string> {
    return this.http.get(`${this.urlBase}/user/test`, { responseType: 'text' }) as Observable<string>;
  }
  
}