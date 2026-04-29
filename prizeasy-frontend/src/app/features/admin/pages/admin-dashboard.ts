import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container">
      <h2>Admin Dashboard</h2>
      <a routerLink="/admin/products">Gestionar productos</a>
      <br />
      <a routerLink="/admin/points">Gestionar puntos</a>
      <br />
      <a routerLink="/products"> Ver catálogo público</a>
      <br />
      <a routerLink="/admin/orders"> Ver pedidos</a>
      <br />
      <a routerLink="/admin/users"> Ver usuarios</a>
    </div>
  `,
})
export class AdminDashboardComponent {}
