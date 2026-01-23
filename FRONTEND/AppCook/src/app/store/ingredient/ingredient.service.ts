import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environment/environment.dev';

export interface Ingredient {
  ingredientid: string;
  name: string;
  avatarurl?: string | null;
}

function normalize(i: any): Ingredient {
  return {
    ingredientid: i.ingredientid || i.ingredientId,
    name: i.ingredientname || i.ingredientName || i.name || '',
    avatarurl: i.avatarurl || i.avatarUrl || null,
  };
}

@Injectable({ providedIn: 'root' })
export class IngredientService {
  constructor(private http: HttpClient) {}

  urlBase = environment.api;

  getAll(): Observable<Ingredient[]> {
    return this.http.get<any[]>(`${this.urlBase}/recipe/ingredients`).pipe(
      map(arr => (arr || []).map(normalize))
    );
  }

  getById(id: string): Observable<Ingredient> {
    return this.http.get<any>(`${this.urlBase}/recipe/ingredients/${id}`).pipe(
      map(normalize)
    );
  }

  search(q: string): Observable<Ingredient[]> {
    return this.http.get<any[]>(`${this.urlBase}/recipe/ingredients/search?q=${encodeURIComponent(q)}`).pipe(
      map(arr => (arr || []).map(normalize))
    );
  }
}
