import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/orders';

  createOrder(productId: number) {
    const body = {
      items: [
        {
          productId: productId,
          quantity: 1,
        },
      ],
    };

    return this.http.post(this.apiUrl, body);
  }
}
