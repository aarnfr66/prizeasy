import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const requiredRole = route.data?.['role'];
  const user = userService.user();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (user.role !== requiredRole) {
    router.navigate(['/products']);
    return false;
  }

  return true;
};
