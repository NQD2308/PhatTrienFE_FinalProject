import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../model/member';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http: HttpClient = inject(HttpClient);
  fauth: Auth = inject(Auth);
  constructor() {}

  // getMembers(): Observable<Member[]> {
  //   return this.http.get<Member[]>('http://localhost:8000/api/items/');
  // }
  // insertMember(member:Member): Observable<Member> {
  //   //	const headers = { 'content-type': 'application/json'} 
  //   //	console.log(JSON.stringify(item))						
  //     return this.http.post<Member>('http://localhost:8000/api/insert/', member);
  // }
  // updateMember(member: Member): Observable<Member> {
  //   return this.http.put<Member>(`http://localhost:8000/api/items/${member.id}`, member);
  // }
  

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
