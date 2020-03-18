import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './pages/account/account.component';
import { IsLoggedIn } from './auth/isLogget';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: AuthComponent },
  { path: 'account', component: AccountComponent, canActivate:[IsLoggedIn] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
