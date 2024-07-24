import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UrlTree } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);
  const auth = inject(AuthService);
  const router = inject(Router);
  if(auth.isUserAuthenticated()){
    return true;
  } else {
    toastr.error("You must first login to access this page");
    return router.parseUrl("/login"); //return a UrlTree
  }
};
