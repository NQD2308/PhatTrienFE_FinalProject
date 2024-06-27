import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../../views/header/header.component';
import { AsideComponent } from '../../../views/aside/aside.component';
import { ItemComponent } from '../item/item.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ItemUpdateComponent } from '../item-update/item-update.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AsideComponent,
    ItemComponent,
    ItemUpdateComponent,
    SignupComponent,
    LoginComponent,
    MainComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MainComponent 
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
