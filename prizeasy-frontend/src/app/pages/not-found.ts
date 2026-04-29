import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <a routerLink="/">Volver al inicio</a>
    </div>
  `,
  styles: [
    `
      .container {
        text-align: center;
        margin-top: 50px;
      }
    `,
  ],
})
export class NotFoundComponent {}
