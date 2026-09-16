import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');
  const recheckToken = ('accessToken');

  if (token) {
    return true;
  } else {
    router.navigate(['login']); 
    return false;
  }
}
export const loginUrlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');

  if (token) {
    router.navigate(['blogs']); 
    return false;
  } else {
    return true;
  }
} 

