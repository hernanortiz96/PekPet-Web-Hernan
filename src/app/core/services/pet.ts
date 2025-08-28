import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../config/api.config';
import { Pet } from '../models/pet';

@Injectable({ providedIn: 'root' })
export class PetService {
  private readonly base = `${API_URL}/pets`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.base}/`);
  }

  getById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.base}/${id}/`);
  }

  create(payload: Partial<Pet>): Observable<Pet> {
    return this.http.post<Pet>(`${this.base}/`, payload);
  }

  update(id: number, payload: Partial<Pet>): Observable<Pet> {
    return this.http.put<Pet>(`${this.base}/${id}/`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}/`);
  }
}
