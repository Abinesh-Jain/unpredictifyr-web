import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const chatGuardGuard: CanActivateFn = (route, state) => {
  const name = route.queryParams['name'];
  const router = inject(Router);
  return name ? true : router.createUrlTree(['']);
};