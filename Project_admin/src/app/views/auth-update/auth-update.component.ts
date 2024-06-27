import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Firestore, addDoc, collection, collectionData, deleteDoc, getDoc, doc, updateDoc, query, where, getDocs, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Member } from '../../model/member';

@Component({
  selector: 'app-auth-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './auth-update.component.html',
  styleUrl: './auth-update.component.css'
})
export class AuthUpdateComponent {
  firestore: Firestore = inject(Firestore);
  auths: Observable<Member[]>;
  auths2: Member[] = [];
  aCollection = collection(this.firestore, 'members');
  config: any;

  fb: FormBuilder = inject(FormBuilder);
  items: Member[] = [];
  insertFrm: any;
  isUpdateMode: boolean = false;
  currentAuthId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.auths = collectionData(this.aCollection, { idField: 'id' }) as Observable<Member[]>;
    this.auths.subscribe(data => {
      this.auths2 = data;
      console.log(data);
      this.updateConfig();
    });

    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.auths2.length
    };
  }

  updateConfig(): void {
    this.config.totalItems = this.auths2.length;
  }

  async loadAuth(id: string) {
    const itemDoc = doc(this.firestore, `members/${id}`);
    const itemSnapshot = await getDoc(itemDoc);
    if (itemSnapshot.exists()) {
      const itemData = itemSnapshot.data() as Member;
      this.insertFrm.patchValue({
        id: itemData.id,
        name: itemData.name,
        email: itemData.email,
        password: itemData.password,
      });
    }
  }

  ngOnInit(): void {
    this.insertFrm = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', []],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isUpdateMode = true;
        this.currentAuthId = id;
        this.loadAuth(id);
      }
    });
  }

  async onSubmit() {
    const member = new Member(
      this.insertFrm.controls["id"].value,
      this.insertFrm.controls["name"].value,
      this.insertFrm.controls["email"].value,
      this.insertFrm.controls["password"].value,
    );

    if (this.isUpdateMode) {
      const itemDoc = doc(this.firestore, `members/${this.currentAuthId}`);
      await updateDoc(itemDoc, member.toPlainObject());
      console.log("update success firebase");
      this.router.navigate(['/auth']); // Điều hướng về trang chủ
    } 

  }
}
