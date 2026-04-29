import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { NavbarComponent } from './shared/navbar';
import { AuthService } from './core/services/auth.service';
import { LoaderComponent } from './shared/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('prizeasy-frontend');

  private userService = inject(UserService);
  private authService = inject(AuthService);

  ngOnInit() {
    if (this.authService.getToken()) {
      this.userService.loadUser();
    } // carga puntos al iniciar la app
  }
}
