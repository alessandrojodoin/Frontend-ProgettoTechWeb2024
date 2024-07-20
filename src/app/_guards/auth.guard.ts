import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UrlTree } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(auth.isUserAuthenticated()){
    return true;
  } else {
    return router.parseUrl("/login"); //return a UrlTree
  }
};
