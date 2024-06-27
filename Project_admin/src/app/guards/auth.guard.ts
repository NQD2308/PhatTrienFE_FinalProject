import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharingService } from '../service/sharing.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sharingService = inject(SharingService);
  const router = inject(Router);
  let kq:boolean = false;
  sharingService.isUserLoggedIn.subscribe((val)=>{
    kq = val;
    if(val == true) {
      kq = true
    }
    else {
      router.navigate(["login"]);
      kq = false
    }
  });

  return kq;
};
