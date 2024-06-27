import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../model/Item';
import {
  Firestore,
  doc,
  collection,
  collectionData,
  deleteDoc,
  deleteField,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  orderBy,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  products: Observable<Item[]>;
  products2: Item[] = [];
  aCollection = collection(this.firestore, 'products');
  config: any;

  fb: FormBuilder = inject(FormBuilder);
  items: Item[] = [];
  insertFrm: any;

  constructor(private route: ActivatedRoute, private router: Router) {
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

  ngOnInit(): void {
    this.insertFrm = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required]],
      houseware: ['', [Validators.required]],
    });
  }

  updateConfig(): void {
    this.config.totalItems = this.products2.length;
  }

  async generateNewId(): Promise<number> {
    const querySnapshot = await getDocs(this.aCollection);
    let maxId = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const currentId = data['id'] ? Number(data['id']) : 0;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId + 1;
  }

  async onSubmit() {
    const newId = await this.generateNewId();

    const item = new Item(
      // this.insertFrm.controls["id"].value,
      newId,
      this.insertFrm.controls['name'].value,
      this.insertFrm.controls['img'].value,
      this.insertFrm.controls['quantity'].value,
      this.insertFrm.controls['description'].value,
      this.insertFrm.controls['price'].value,
      this.insertFrm.controls['houseware'].value
    );

    // const newDocRef = await addDoc(this.aCollection, item.toPlainObject());
    const newDocRef = doc(this.aCollection, newId.toString());
    await setDoc(newDocRef, item.toPlainObject());
    console.log('New document added with ID:', newDocRef.id);

    console.log('put success firebase');
    this.router.navigate(['/']);
  }
}
