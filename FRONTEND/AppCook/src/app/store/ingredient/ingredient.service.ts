import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.dev';

export interface Ingredient {
  ingredientid: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class IngredientService {
  constructor(private http: HttpClient) {}

  urlBase = environment.api;

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.urlBase}/recipe/ingredients`);
  }

  getById(id: string): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.urlBase}/recipe/ingredients/${id}`);
  }

  create(data: Partial<Ingredient>): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.urlBase}/recipe/ingredients`, data);
  }

  update(id: string, data: Partial<Ingredient>): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.urlBase}/recipe/ingredients/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/recipe/ingredients/${id}`);
  }
}
