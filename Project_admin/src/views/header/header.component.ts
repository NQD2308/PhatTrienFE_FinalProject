import { Component, inject } from '@angular/core';
import { MemberService } from '../../app/service/member.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app/service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { user } from '@angular/fire/auth';
import { SharingService } from '../../app/service/sharing.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  displayName: any;

  //DI
  userService: MemberService = inject(MemberService);
  sharingSrv: SharingService = inject(SharingService);

  router: Router = inject(Router);

  fauthService: AuthService = inject(AuthService);

  constructor() {
    this.sharingSrv.isUserLoggedIn.subscribe((value) => {
      if (value) {
        this.userService
          .getCurrentUser()
          .then((user) => {
            this.displayName =
              user.displayName != null ? user.displayName : user.email;
            console.log(this.displayName);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
         this.displayName="" //ngược lại khi value=false thì gán lại this.displayName="" để cập nhật lại giao diện
      }
    });

    this.userService.getCurrentUser().then((user) => {
      this.displayName =
        user.displayName != null ? user.displayName : user.email;
      console.log('display Name:', this.displayName);
    });
  }

  logout() {
    this.fauthService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
