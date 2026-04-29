import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private api = inject(ApiService);

  getAll() {
    return this.api.get<any[]>('products');
  }
}
