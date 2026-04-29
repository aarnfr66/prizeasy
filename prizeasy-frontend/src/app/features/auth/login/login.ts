import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  private cdr = inject(ChangeDetectorRef);
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}

  login() {
    this.submitted = true;

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingresa correo y contraseña';
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.userService.loadUser();
        this.router.navigate(['/products']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('ERROR COMPLETO:', err);
        console.log('STATUS:', err.status);
        this.loading = false;

        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Correo o contraseña incorrectos';
          this.cdr.detectChanges();
        } else {
          this.errorMessage = 'Error del servidor';
          this.cdr.detectChanges();
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
