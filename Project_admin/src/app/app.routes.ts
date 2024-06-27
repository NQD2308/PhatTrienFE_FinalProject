import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { ItemComponent } from './views/item/item.component';
import { SignupComponent } from './views/signup/signup.component';
import { LoginComponent } from './views/login/login.component';
import { ItemUpdateComponent } from './views/item-update/item-update.component';
import { LoginLayoutComponent } from './views/login-layout/login-layout.component';
import { MainLayoutComponent } from './views/main-layout/main-layout.component';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './views/auth/auth.component';
import { AuthUpdateComponent } from './views/auth-update/auth-update.component';
export const routes: Routes = [
  // {
  //   path:"admin", component: MainLayoutComponent,
  //   canActivate:[authGuard],
  //   children: [
  //     { path: '', component: MainLayoutComponent },
  //     { path: 'item', component: ItemComponent },
  //     { path: 'auth', component: AuthComponent },
  //     { path: 'auth-update/:id', component: AuthUpdateComponent },
  //     { path: 'createauth', component: SignupComponent },
  //     { path: 'item-update/:id', component: ItemUpdateComponent },
  //   ]
  // },
  { path: '', component: MainLayoutComponent },
  { path: 'item', component: ItemComponent },
  { path: 'item-update/:id', component: ItemUpdateComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'auth-update/:id', component: AuthUpdateComponent },
  { path: 'createauth', component: SignupComponent },
  { path: 'login', component: LoginLayoutComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class app {}
