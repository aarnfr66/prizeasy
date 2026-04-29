import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminProductsService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/api/products';

  getAll() {
    return this.http.get<any[]>(this.API);
  }

  create(product: any) {
    return this.http.post(this.API, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
  update(id: number, product: any) {
    return this.http.put(`${this.API}/${id}`, product);
  }
}
