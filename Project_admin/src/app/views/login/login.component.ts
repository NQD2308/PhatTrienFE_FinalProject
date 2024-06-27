import { Component, inject } from '@angular/core';
import { MainComponent } from '../main/main.component';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { user } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MainComponent, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authSrv: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  userFrm: FormGroup;

  constructor() {
    // Khởi tạo FormGroup trong constructor sử dụng FormBuilder
    this.userFrm = this.fb.group({
      email: ['', Validators.required], // Định nghĩa trường email với yêu cầu bắt buộc
      password: ['', Validators.required], // Định nghĩa trường password với yêu cầu bắt buộc
    });
  }

  login() {
    this.authSrv
      .login(
        this.userFrm.get('email')?.value,
        this.userFrm.get('password')?.value
      )
      .then((user) => {  
        this.router.navigate(['/']); // Điều hướng đến trang chủ sau khi đăng nhập thành công
      });
  }

  tryGoogleLogin() {
    this.authSrv.signinGmail().then((user) => {
      this.router.navigate(["/auth"])
      // location.href = '/admin';
    });
  }
}
