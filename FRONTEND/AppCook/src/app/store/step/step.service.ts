import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.dev';

export interface RecipeStep {
  stepid: string;
  recipeid: string;
  stepindex: number;
  description: string;
  duration?: number | null;
  imageid?: string | null;
  videoid?: string | null;
  tips?: any | null;
}

@Injectable({ providedIn: 'root' })
export class StepService {
  constructor(private http: HttpClient) {}

  urlBase = environment.api;

  addSteps(recipeId: string, steps: any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.urlBase}/recipe/${recipeId}/steps`, { steps });
  }
}
