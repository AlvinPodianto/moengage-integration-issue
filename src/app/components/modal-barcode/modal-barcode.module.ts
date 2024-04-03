import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ModalBarcodeComponent } from './modal-barcode.component'; 
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    QRCodeModule
  ],
  declarations: [
      ModalBarcodeComponent
  ],
  exports: [
    ModalBarcodeComponent
  ],
})
export class ModalBarcodeModule { }
