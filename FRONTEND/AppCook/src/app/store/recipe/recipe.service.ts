import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.dev';

export interface Recipe {
  recipeid: string;
  name: string;
  userid: string;
  description?: string | null;
  servings?: number | null;
  createdat?: string;
  updatedat?: string | null;
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private http: HttpClient) {}

  urlBase = environment.api;

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.urlBase}/recipe`);
  }

  getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.urlBase}/recipe/${id}`);
  }

  create(data: Partial<Recipe>): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.urlBase}/recipe`, data);
  }

  update(id: string, data: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.urlBase}/recipe/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/recipe/${id}`);
  }
}
