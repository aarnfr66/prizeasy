import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:8080/auth';

  private router = inject(Router);
  private userService = inject(UserService);

  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.API}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.isAuthenticated.set(true);
      }),
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    // token
    localStorage.removeItem('token');

    // estado auth
    this.isAuthenticated.set(false);

    // limpiar datos del usuario
    this.userService.clearUserData();

    // redirigir
    this.router.navigate(['/login']);
  }
}
