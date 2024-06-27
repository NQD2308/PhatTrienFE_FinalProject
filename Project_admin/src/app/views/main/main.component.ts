import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { Item } from '../../model/Item';
import { FormsModule } from '@angular/forms';

// export interface products {
//   id: string;
//   name: string;
//   img: string;
//   quantity: number;
//   description: string;
//   price: number;
//   houseware: number;
// }

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  firestore: Firestore = inject(Firestore);
  products: Observable<Item[]>;
  products2: Item[] = [];
  aCollection = collection(this.firestore, 'products');
  config: any;
  name = '';

  constructor() {
    this.products = collectionData(this.aCollection, {
      idField: 'id',
    }) as Observable<Item[]>;
    this.products.subscribe((data) => {
      this.products2 = data;
      console.log(data);
      this.updateConfig();
    });

    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.products2.length,
    };
  }

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const itemsPerPage = Number(target.value);
    this.config.itemsPerPage = itemsPerPage;
  }

  updateConfig(): void {
    this.config.totalItems = this.products2.length;
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  // async add (){
  //   let it : products = {
  //     id: '6',
  //     name: 'name',
  //     img: '123.png',
  //     quantity: 12,
  //     description: 'ABC',
  //     price: 3.99,
  //     houseware: 11
  //   };

  //   //Them 1 item vào collection với docid tự động tạo
  //   const newDocRef = await addDoc(this.aCollection, it);
  //   console.log('New document added with ID:', newDocRef.id);

  //   //Lay thong tin 1 item theo docid
  //   let itemDoc = doc(this.firestore,"products/2");
  //   console.log(itemDoc);
  // }

  // async update (){

  //   //lay thong tin 1 item theo docid
  //   let itemDoc = doc(this.firestore,"products/2EhJuRBNRcmKEwycKNaz");

  //   //cap nhat va them thuoc tinh moi neu khong ton tai
  //   // await setDoc(itemDoc, {name:"Name 6",id:"5", description:"AAA", houseware:"11"})

  //   //cap nhat du lieu cua 1 item
  //   // await updateDoc(itemDoc ,{name:"AAA", description:"123"})

  //   // Xoa field cua 1 item
  //   await updateDoc( itemDoc ,{houseware:11 , id: deleteField()});

  // }

  async delete(id: number) {
    try {
      const itemDocRef = doc(this.firestore, `products/${id}`);
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
        orderBy('name'),
        where('name', '>=', name),
        where('name', '<=', name + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);

      const searchResults: Item[] = [];
      querySnapshot.forEach((doc) => {
        searchResults.push(doc.data() as Item);
        console.log(doc.id, '=>', doc.data());
      });

      this.products2 = searchResults;
      this.updateConfig();
    } catch (error) {}
  }
}
