import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../config/api.config';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly base = `${API_URL}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}/`);
  }

  create(payload: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.base}/`, payload);
  }

  update(id: number, payload: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.base}/${id}/`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}/`);
  }
}
