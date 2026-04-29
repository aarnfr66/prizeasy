import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { CreateUserRequest } from '../../../models/createuser.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
})
export class AdminUsersComponent implements OnInit {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  users = signal<User[]>([]);

  ngOnInit() {
    this.userService.getAll().subscribe((data) => {
      this.users.set(data);
    });
  }
  newUser: CreateUserRequest = {
    name: '',
    email: '',
    dni: '',
    password: '',
    roleId: 1,
  };

  errorMessage = '';

  createUser() {
    this.userService.create(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al crear usuario, email o DNI ya existe';

        this.cdr.detectChanges();
      },
    });
  }

  loadUsers() {
    this.userService.getAll().subscribe((data) => {
      this.users.set(data);
    });
  }
  isFormValid(): boolean {
    return (
      this.newUser.name.trim() !== '' &&
      this.newUser.email.includes('@') &&
      this.newUser.dni.trim() !== '' &&
      this.newUser.password.length >= 4
    );
  }
}
