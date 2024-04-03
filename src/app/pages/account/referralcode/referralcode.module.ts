import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferralcodePageRoutingModule } from './referralcode-routing.module';

import { ReferralcodePage } from './referralcode.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferralcodePageRoutingModule,
    SharedComponentModule
  ],
  declarations: [ReferralcodePage]
})
export class ReferralcodePageModule {}
