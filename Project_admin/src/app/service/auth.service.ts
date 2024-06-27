import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { SharingService } from './sharing.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //DI
  fauth: Auth = inject(Auth);
  sharing: SharingService = inject(SharingService)

  async CreateAccount(username: string, password: string) {
    return await createUserWithEmailAndPassword(this.fauth, username, password)
      .then((result) => {
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  //Dùng để Đăng nhập tài khoản trên Firebase
  async login(username: string, password: string) {
    return await signInWithEmailAndPassword(this.fauth, username, password)
      .then((result) => {
        var user = result.user;
        this.sharing.isUserLoggedIn.next(true);
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  async signinGmail(){
    var provider = new GoogleAuthProvider();
    return await  signInWithPopup(this.fauth,provider)
    .then( result => {
      var user = result.user;
      this.sharing.isUserLoggedIn.next(true);
      console.log(user)
      // IdP data available in result.additionalUserInfo.profile.				
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
     
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      if (this.fauth.currentUser) {
        this.fauth.signOut();
        this.sharing.isUserLoggedIn.next(false);
        resolve('log out');
      } else {
        reject();
      }
    });
  }
}
