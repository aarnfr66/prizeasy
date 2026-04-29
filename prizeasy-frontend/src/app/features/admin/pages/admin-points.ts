import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PointsService } from '../../../services/points.service';
import { PointsRequest } from '../../../models/points.model';
import { PointsHistory } from '../../../models/points.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Admin - Gestión de Puntos</h2>

      <input placeholder="Email usuario" [(ngModel)]="form.email" />
      <input type="number" placeholder="Puntos" [(ngModel)]="form.points" />
      <input placeholder="Descripción" [(ngModel)]="form.description" />

      <br /><br />

      <button (click)="add()">➕ Agregar</button>&nbsp;
      <button (click)="deduct()">➖ Descontar</button>

      <p *ngIf="error()" style="color:red">{{ error() }}</p>

      <hr />
      <h3>Historial</h3>

      <button (click)="load()">Cargar historial</button>

      <ul>
        <li *ngFor="let h of history()">
          {{ h.userEmail }} - {{ h.points }} - {{ h.type }} - {{ h.description }}
        </li>
      </ul>
    </div>
  `,
})
export class AdminPointsComponent {
  private service = inject(PointsService);
  history = signal<PointsHistory[]>([]);

  error = signal('');

  form: PointsRequest = {
    email: '',
    points: 0,
    description: '',
  };

  isValid(): boolean {
    return !!this.form.email && this.form.points > 0;
  }

  add() {
    if (!this.isValid()) {
      this.error.set('Datos inválidos');
      return;
    }

    this.service.addPoints(this.form).subscribe({
      next: () => {
        alert('Puntos agregados');
        setTimeout(() => this.reset());
      },
      error: () => this.error.set('Error al agregar puntos'),
    });
  }

  deduct() {
    if (!this.isValid()) {
      this.error.set('Datos inválidos');
      return;
    }

    this.service.deductPoints(this.form).subscribe({
      next: () => {
        alert('Puntos descontados');
        setTimeout(() => this.reset());
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Error al descontar');
      },
    });
  }

  reset() {
    this.form = {
      email: '',
      points: 0,
      description: '',
    };
    this.error.set('');
  }
  load() {
    this.service.getAllHistory().subscribe((data) => {
      this.history.set(data);
    });
  }
}
