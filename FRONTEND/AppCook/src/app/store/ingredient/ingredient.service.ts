import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.dev';

export interface Ingredient {
  ingredientid: string;
  name: string;
  avatarurl?: string | null;
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

  search(q: string): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.urlBase}/recipe/ingredients/search?q=${encodeURIComponent(q)}`);
  }
}
