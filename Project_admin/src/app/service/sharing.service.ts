import { Injectable, inject } from '@angular/core';
import { MemberService } from './member.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  userSrv: MemberService =inject(MemberService);
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {
    this.userSrv.getCurrentUser().then(user=>{
      if(user){
      this.isUserLoggedIn.next(true)
      }
    })
    }
}
