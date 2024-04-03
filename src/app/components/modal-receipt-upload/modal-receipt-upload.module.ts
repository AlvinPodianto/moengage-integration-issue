import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ModalReceiptUploadComponent } from './modal-receipt-upload.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule
  ],
  declarations: [
      ModalReceiptUploadComponent
  ],
  exports: [
    ModalReceiptUploadComponent
  ],
})
export class ModalReceiptUploadModule { }
