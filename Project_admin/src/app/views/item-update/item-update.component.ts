import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Item } from '../../model/Item';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-item-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  products: Observable<Item[]>;
  products2: Item[] = [];
  aCollection = collection(this.firestore, 'products');
  config: any;

  fb: FormBuilder = inject(FormBuilder);
  items: Item[] = [];
  updateFrm: any;
  isUpdateMode: boolean = false;
  currentItemId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.products = collectionData(this.aCollection, { idField: 'id' }) as Observable<Item[]>;
    this.products.subscribe(data => {
      this.products2 = data;
      this.updateConfig();
    });

    this.config = {
      totalItems: this.products2.length
    };
  }

  ngOnInit(): void {
    this.updateFrm = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required]],
      img: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required]],
      houseware: ['', []],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isUpdateMode = true;
        this.currentItemId = id;
        this.loadItem(id);
      }
    });
  }

  updateConfig(): void {
    this.config.totalItems = this.products2.length;
  }

  async loadItem(id: string) {
    const itemDoc = doc(this.firestore, `products/${id}`);
    const itemSnapshot = await getDoc(itemDoc);
    if (itemSnapshot.exists()) {
      const itemData = itemSnapshot.data() as Item;
      this.updateFrm.patchValue({
        id: itemData.id,
        name: itemData.name,
        img: itemData.img,
        quantity: itemData.quantity,
        description: itemData.description,
        price: itemData.price,
        houseware: itemData.houseware,
      });
    }
  }

  async onSubmit() {
    const item = new Item(
      this.updateFrm.controls["id"].value,
      this.updateFrm.controls["name"].value,
      this.updateFrm.controls["img"].value,
      this.updateFrm.controls["quantity"].value,
      this.updateFrm.controls["description"].value,
      this.updateFrm.controls["price"].value,
      this.updateFrm.controls["houseware"].value
    );
  
    if (this.isUpdateMode) {
      const itemDoc = doc(this.firestore, `products/${this.currentItemId}`);
      await updateDoc(itemDoc, item.toPlainObject());
      console.log("update success firebase");
      this.router.navigate(['/']); // Điều hướng về trang chủ
    } 
  }
  
}
