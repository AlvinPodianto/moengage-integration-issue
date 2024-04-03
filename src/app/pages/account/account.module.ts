import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { AccountService } from './account.service';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    SharedComponentModule,
    QRCodeModule
  ],
  declarations: [AccountPage],
  providers:[
    AccountService
  ]
})
export class AccountPageModule {}
