import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsService } from '../services/admin-products.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';
import { Product } from '../../../models/product.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Admin - Productos</h2>

      <button *ngIf="!showForm()" (click)="toggleForm()">Nuevo producto</button>
      <br /><br />
      <div *ngIf="showForm()" class="form-box">
        <h3>{{ editing() ? 'Editar producto' : 'Nuevo producto' }}</h3>

        <input placeholder="Nombre" [(ngModel)]="newProduct.name" />

        <input type="number" placeholder="Costo en puntos" [(ngModel)]="newProduct.pointsCost" />

        <input type="number" placeholder="Stock" [(ngModel)]="newProduct.stock" />

        <input placeholder="Descripción" [(ngModel)]="newProduct.description" />

        <input placeholder="URL de imagen" [(ngModel)]="newProduct.imageUrl" />

        <select [(ngModel)]="newProduct.categoryId">
          <option [ngValue]="null">Sin categoría</option>
          <option *ngFor="let c of categories()" [ngValue]="c.id">
            {{ c.name }}
          </option>
        </select>

        <!-- Validaciones -->
        <p *ngIf="submitted && !newProduct.name">El nombre es obligatorio</p>
        <p *ngIf="submitted && (newProduct.pointsCost ?? 0) <= 0">
          El costo en puntos debe ser mayor a 0
        </p>
        <p *ngIf="submitted && (newProduct.stock ?? 0) < 0">El stock no puede ser negativo</p>

        <button *ngIf="!editing()" (click)="create()">Guardar</button>
        <button *ngIf="editing()" (click)="update()">Actualizar</button>
        <button *ngIf="editing()" (click)="cancel()">Cancelar</button>
      </div>

      <div class="grid">
        <div class="card" *ngFor="let p of products()">
          <h3>{{ p.name }}</h3>

          <p>{{ p.pointsCost }} puntos</p>
          <p>Stock: {{ p.stock }}</p>
          <p class="meta">{{ p.category?.name || 'Sin categoría' }}</p>

          <div class="actions">
            <button (click)="edit(p)">Editar</button>
            <button class="danger" (click)="delete(p.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductsAdminComponent implements OnInit {
  private service = inject(AdminProductsService);
  private categoryService = inject(CategoryService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  showForm = signal(false);
  editing = signal(false);
  editingId: number | null = null;
  submitted = false;

  newProduct: Partial<Product> & { categoryId: number | null } = {
    name: '',
    description: '',
    imageUrl: '',
    pointsCost: 0,
    stock: 0,
    categoryId: null,
  };

  ngOnInit() {
    this.load();
    this.loadCategories();
  }

  load() {
    this.service.getAll().subscribe((data) => {
      this.products.set(data);
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories.set(data);
    });
  }

  toggleForm() {
    this.showForm.update((v) => !v);
  }

  create() {
    this.submitted = true;
    if (!this.isValid()) return;

    const payload = {
      ...this.newProduct,
      category: this.newProduct.categoryId ? { id: this.newProduct.categoryId } : null,
    };

    this.service.create(payload).subscribe({
      next: () => {
        alert('Producto creado correctamente');
        this.load();
        this.resetForm();
      },
      error: () => alert('Error al crear producto'),
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        alert('Producto eliminado correctamente');
        this.load();
      },
      error: () => {
        alert('Error al eliminar producto');
      },
    });
  }

  edit(p: any) {
    this.newProduct = {
      ...p,
      categoryId: p.category?.id || null, //  clave
    };
    this.editingId = p.id;
    this.editing.set(true);
    this.showForm.set(true);
  }

  update() {
    this.submitted = true;

    if (!this.isValid() || !this.editingId) return;

    const payload = {
      ...this.newProduct,
      category: this.newProduct.categoryId ? { id: this.newProduct.categoryId } : null,
    };

    this.service.update(this.editingId, payload).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.load();
        this.resetForm();
      },
      error: () => alert('Error al actualizar producto'),
    });
  }

  cancel() {
    this.resetForm();
  }

  isValid(): boolean {
    return (
      !!this.newProduct.name &&
      (this.newProduct.pointsCost ?? 0) > 0 &&
      (this.newProduct.stock ?? 0) >= 0
    );
  }

  resetForm() {
    this.newProduct = {
      name: '',
      description: '',
      imageUrl: '',
      pointsCost: 0,
      stock: 0,
      categoryId: null,
    };

    this.editing.set(false);
    this.editingId = null;
    this.showForm.set(false);
    this.submitted = false;
  }
}
