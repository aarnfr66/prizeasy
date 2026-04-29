import { Component, inject } from '@angular/core';
import { UserService } from '../services/user';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="left" routerLink="/products">Prizeasy</div>

      <div class="right" *ngIf="authService.isAuthenticated(); else guest">
        <span *ngIf="isAdmin()" routerLink="/admin">Admin</span>

        <span *ngIf="isUser()" routerLink="/my-points">Mis puntos</span>
        <span *ngIf="isUser()" class="points">⭐ {{ userService.points() }}</span>

        <span *ngIf="isUser()" routerLink="/my-orders">Mis pedidos</span>
        <span *ngIf="isAdmin()" routerLink="/admin/orders">Pedidos</span>

        <button class="logout" (click)="logout()">Logout</button>
      </div>

      <ng-template #guest>
        <div class="right">
          <span>Login</span>
        </div>
      </ng-template>
    </nav>
  `,
})
export class NavbarComponent {
  authService = inject(AuthService);
  userService = inject(UserService);
  isAdmin = () => this.userService.user()?.role === 'ADMIN';
  isUser = () => this.userService.user()?.role === 'USER';

  logout() {
    this.authService.logout();
  }
}
