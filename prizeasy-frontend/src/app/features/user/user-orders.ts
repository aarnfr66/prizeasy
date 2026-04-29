import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Mis pedidos</h2>

      <ul *ngIf="orders().length > 0; else empty">
        <li *ngFor="let o of orders()">
          <strong>Orden #{{ o.id }}</strong> - {{ o.totalPoints }} puntos - {{ o.status }}
          <div class="meta">
            {{ o.createdAt ? (o.createdAt | date: 'short') : 'Sin fecha' }}
          </div>
          <ul>
            <li *ngFor="let d of o.details">
              {{ d.productName }} x{{ d.quantity }} ({{ d.pointsCost }} pts)
            </li>
          </ul>

          <hr />
        </li>
      </ul>

      <ng-template #empty>
        <p>No tienes pedidos aún</p>
      </ng-template>
    </div>
  `,
})
export class UserOrdersComponent implements OnInit {
  private service = inject(OrdersService);

  orders = signal<Order[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getMyOrders().subscribe({
      next: (data) => this.orders.set(data),
      error: () => alert('Error al cargar pedidos'),
    });
  }
}
