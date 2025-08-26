import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../config/api.config';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/auth/token/`, credentials);
  }

  
  refresh(refreshToken: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/token/refresh/`, { refresh: refreshToken });
  }

  
  verify(token: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/token/verify/`, { token });
  }
}

