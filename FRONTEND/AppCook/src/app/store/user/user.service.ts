import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.dev';

export interface User {
  userid: string; // UUID
  email: string;
  pseudo: string;
  avatarurl?: string | null;
  bio?: string | null;
  role?: string | null;
  // Le password n'est jamais retourné par l'API pour des raisons de sécurité
}

export interface AuthResponse {
  accessToken: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  urlBase = environment.api;

  // Auth endpoints
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.urlBase}/user/auth/login`, { email, password });
  }

  register(email: string, password: string, pseudo: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.urlBase}/user/auth/register`, { email, password, pseudo });
  }

  // User endpoints
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.urlBase}/user`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlBase}/user/all`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.urlBase}/user/${id}`);
  }

  updateUser(id: string, data: { email?: string; pseudo?: string; avatarurl?: string; bio?: string }): Observable<User> {
    return this.http.put<User>(`${this.urlBase}/user/${id}`, data);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/user/${id}`);
  }
}
