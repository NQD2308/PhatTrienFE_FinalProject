import { Component, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [LoginComponent, RouterOutlet],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginLayoutComponent {

}
