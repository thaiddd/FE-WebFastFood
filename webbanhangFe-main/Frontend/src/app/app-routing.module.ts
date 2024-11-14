import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SalesComponent} from "./sales/sales.component";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./sales/components/login/login.component";
import {SignupComponent} from "./sales/components/signup/signup.component";

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
