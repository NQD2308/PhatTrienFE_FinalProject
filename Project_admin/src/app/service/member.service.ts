import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../model/member';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  fauth: Auth = inject(Auth);
  constructor() {}

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      onAuthStateChanged(this.fauth, (user) => {
        if (user) {
          console.log('user service', user);
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
