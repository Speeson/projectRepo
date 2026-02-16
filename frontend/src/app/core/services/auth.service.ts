import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../api-base';
import type { AuthUser, LoginResponse } from '../models';

const TOKEN_KEY = 'repo_token';
const USER_KEY = 'repo_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<AuthUser | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    const rawUser = localStorage.getItem(USER_KEY);
    if (rawUser) {
      this.currentUser.set(JSON.parse(rawUser) as AuthUser);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${API_BASE_URL}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));
          this.currentUser.set(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    void this.router.navigate(['/public']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
