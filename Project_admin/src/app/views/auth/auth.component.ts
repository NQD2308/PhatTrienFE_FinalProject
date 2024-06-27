import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  deleteField,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
} from '@angular/fire/firestore';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../model/member';
import { FormsModule } from '@angular/forms';

export interface member {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  firestore: Firestore = inject(Firestore);
  member: Observable<Member[]>;
  member2: Member[] = [];
  aCollection = collection(this.firestore, 'members');
  config: any;
  name = '';

  constructor() {
    this.member = collectionData(this.aCollection, {
      idField: 'id',
    }) as Observable<Member[]>;
    this.member.subscribe((data) => {
      this.member2 = data;
      console.log(data);
      this.updateConfig();
    });

    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.member2.length,
    };
  }

  updateConfig(): void {
    this.config.totalItems = this.member2.length;
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  async delete(id: number) {
    try {
      const itemDocRef = doc(this.firestore, `members/${id}`);
      await deleteDoc(itemDocRef);
      console.log(`Document with ID ${id} has been deleted`);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }

  async search(name: string) {
    try {
      // const itemDocRef = doc(this.aCollection)
      const q = query(
        this.aCollection,
        orderBy('email'),
        where('email', '>=', name),
        where('email', '<=', name + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);

      const searchResults: Member[] = [];
      querySnapshot.forEach((doc) => {
        searchResults.push(doc.data() as Member);
        console.log(doc.id, '=>', doc.data());
      });

      this.member2 = searchResults;
      this.updateConfig();
    } catch (error) {}
  }
}
