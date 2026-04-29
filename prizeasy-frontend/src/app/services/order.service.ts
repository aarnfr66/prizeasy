import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/orders';

  getMyOrders() {
    return this.http.get<Order[]>(`${this.API}/my-orders`);
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.API);
  }
}
