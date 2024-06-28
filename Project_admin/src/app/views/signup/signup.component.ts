import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
  query,
  limit,
  orderBy,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Member } from '../../model/member';
import { MemberService } from '../../service/member.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { user } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoginComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  firestore: Firestore = inject(Firestore);
  members: Observable<Member[]>;
  members2: Member[] = [];
  aCollection = collection(this.firestore, 'members');
  fauthService: AuthService = inject(AuthService);
  passwordMismatch: boolean = false;
  userFrm: any;
  config: any;

  memberSrv: MemberService = inject(MemberService);
  fb: FormBuilder = inject(FormBuilder);
  items: Member[] = [];
  insertFrm: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.members = collectionData(this.aCollection, {
      idField: 'id',
    }) as Observable<Member[]>;
    this.members.subscribe((data) => {
      this.members2 = data;
      console.log(data);
      this.updateConfig();
    });

    this.userFrm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      re_password: [''],
    });

    this.config = {
      totalMember: this.members2.length,
    };
  }

  ngOnInit(): void {
    this.insertFrm = this.fb.group({
      id: ['', []],
      email: ['', [Validators.required]],
      name: ['', []],
      password: ['', [Validators.required]],
      re_password: ['', [Validators.required]],
    });

    // this.memberSrv.getMembers().subscribe((data: Member[]) => {
    //   this.items = data;
    // });
  }

  updateConfig(): void {
    this.config.totalMember = this.members2.length;
  }

  // Increatement ID
  async getMaxId(): Promise<number> {
    const q = query(this.aCollection, orderBy('id', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    let maxId = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data['id'] && typeof data['id'] === 'number') {
        maxId = data['id'];
      }
    });
    return maxId + 1;
  }

  async createUser() {
    const password = this.userFrm.controls.password.value;
    const re_password = this.userFrm.controls.re_password.value;

    if (password !== re_password) {
      this.passwordMismatch = true;
      return;
    } else {
      this.passwordMismatch = false;
    }

    this.insertFrm.patchValue({
      name: null,
      email: this.userFrm.controls.email.value,
      password: password,
    });

    const newId = await this.getMaxId();
    const member = new Member(
      newId,
      this.insertFrm.controls['name'].value,
      this.insertFrm.controls['email'].value,
      this.insertFrm.controls['password'].value
    );

    if (this.userFrm.valid) {
      this.fauthService
        .CreateAccount(this.userFrm.controls.email.value, password)
        .then((user) => {
          console.log(user);
          this.router.navigate(['/auth']);
        });
    }

    const newDocRef = doc(this.aCollection, newId.toString());
    await setDoc(newDocRef, member.toPlainObject());
    console.log('New document added with ID:', newDocRef.id);
  }
}
