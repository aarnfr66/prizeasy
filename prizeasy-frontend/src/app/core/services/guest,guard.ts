import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = !!authService.getToken();

  if (isLogged) {
    router.navigate(['/products']);
    return false;
  }

  return true;
};
