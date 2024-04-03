import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalGuard } from 'src/app/sevices/guard/modal-guard.service'; 

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    canDeactivate:[ModalGuard],
    component: LoginPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
