import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from './products.service';
import { ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/order';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user';

interface Product {
  id: number;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductListComponent {
  private productService = inject(ProductsService);
  private orderService = inject(OrderService);
  private userService = inject(UserService);
  baseUrl = 'http://localhost:8080';

  products$: Observable<Product[]> = this.productService.getAll();
  redeem(product: Product) {
    this.userService.points.update((p) => {
      if (p === null) return 0;
      return p - product.pointsCost;
    });
    this.orderService.createOrder(product.id).subscribe({
      next: () => {
        alert('✅ Canje realizado');
        this.userService.refreshPoints();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al canjear');
      },
    });
  }
  onImageError(event: any) {
    event.target.src = 'assets/no-image.png';
  }
}
