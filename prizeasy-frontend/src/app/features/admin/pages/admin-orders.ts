import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Admin - Todos los pedidos</h2>

      <button (click)="load()">Cargar pedidos</button>

      <ul *ngIf="orders().length > 0">
        <div class="card" *ngFor="let o of orders()">
          <strong> Orden #{{ o.id }} - {{ o.userEmail || 'N/A' }} </strong>
          <div class="meta">
            {{ o.totalPoints }} puntos - <span class="status">{{ o.status }}</span> -
            {{ o.createdAt ? (o.createdAt | date: 'short') : 'Sin fecha' }}
          </div>
          <ul>
            <li *ngFor="let d of o.details">
              {{ d.productName }} x{{ d.quantity }} ({{ d.pointsCost }} pts)
            </li>
          </ul>

          <hr />
        </div>
      </ul>
    </div>
  `,
})
export class AdminOrdersComponent implements OnInit {
  private service = inject(OrdersService);

  orders = signal<Order[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAllOrders().subscribe({
      next: (data) => this.orders.set(data),
      error: () => alert('Error al cargar pedidos'),
    });
  }
}
