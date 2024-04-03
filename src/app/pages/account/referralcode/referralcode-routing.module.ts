import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferralcodePage } from './referralcode.page';

const routes: Routes = [
  {
    path: '',
    component: ReferralcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralcodePageRoutingModule {}
