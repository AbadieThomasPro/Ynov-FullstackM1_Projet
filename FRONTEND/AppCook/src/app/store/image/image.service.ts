import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.dev';

export interface RecipeImage {
  imageid: string;
  stepid: string;
  image: any;
  order: number;
  alt_text: string;
}

@Injectable({ providedIn: 'root' })
export class ImageService {
  constructor(private http: HttpClient) {}

  urlBase = environment.api;

  addImages(recipeId: string, images: any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.urlBase}/recipe/${recipeId}/images`, { images });
  }
}
