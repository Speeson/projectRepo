import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import type { UserRole } from '../models';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentRole = authService.currentUser()?.role;
  const allowedRoles = (route.data?.['roles'] ?? []) as UserRole[];

  if (currentRole && allowedRoles.includes(currentRole)) {
    return true;
  }

  void router.navigate(['/public']);
  return false;
};
