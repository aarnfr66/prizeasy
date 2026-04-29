import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/users';

  //  estado global
  user = signal<any | null>(null);
  points = signal<number | null>(null);

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getMe() {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  loadUser() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.getMe().subscribe({
      next: (user) => {
        this.user.set(user);
        this.points.set(user.points);
      },
      error: (err) => console.error('Error loading user', err),
    });
  }

  refreshPoints() {
    this.getMe().subscribe({
      next: (user) => this.points.set(user.points),
    });
  }

  clearUserData() {
    this.points.set(null);
    this.user.set(null);
  }
}
