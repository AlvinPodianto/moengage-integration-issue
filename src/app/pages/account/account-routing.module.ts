import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/sevices/guard/auth-guard.service';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    component: AccountPage
  },
  {
    path: 'referralcode',
    canActivate:[AuthGuard],
    loadChildren: () => import('./referralcode/referralcode.module').then( m => m.ReferralcodePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
