import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsService } from '../../services/points.service';
import { PointsHistory } from '../../models/points.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Mis puntos</h2>

      <button (click)="load()">Cargar historial</button>

      <ul *ngIf="history().length > 0; else empty">
        <li *ngFor="let h of history()">
          <strong [style.color]="h.points > 0 ? 'green' : 'red'">
            {{ h.points > 0 ? '+' : '' }}{{ h.points }}
          </strong>
          - {{ h.type }} - {{ h.description }} - {{ h.createdAt | date: 'short' }}
        </li>
      </ul>

      <ng-template #empty>
        <p>No tienes movimientos aún</p>
      </ng-template>
    </div>
  `,
})
export class UserPointsComponent implements OnInit {
  private service = inject(PointsService);

  history = signal<PointsHistory[]>([]);

  ngOnInit() {
    this.load(); // carga automática
  }

  load() {
    this.service.getMyHistory().subscribe({
      next: (data) => this.history.set(data),
      error: () => alert('Error al cargar historial'),
    });
  }
}
