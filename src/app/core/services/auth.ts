import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://pekpet-api-testing.devcrespo.tech/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/token/`, credentials);
  }

  refreshToken(refresh: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/token/refresh/`, { refresh });
  }

  verifyToken(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/verify/`, { token });
  }
}

