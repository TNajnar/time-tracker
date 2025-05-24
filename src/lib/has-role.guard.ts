import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from 'services/auth.service';
import { ERoles } from './enums';

export const hasRoleGuard: CanActivateFn = (route) => {
  const router: Router = inject(Router);
  const userRole: ERoles = inject(AuthService).getUserRole;
  const expectedRoles: ERoles[] = route.data['roles'];

  const hasRole: boolean = expectedRoles.some((role) => userRole === role);

  return hasRole || router.navigate(['auth']);
};
