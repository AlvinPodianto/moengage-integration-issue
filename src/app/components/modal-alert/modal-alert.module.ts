import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ModalAlertComponent } from './modal-alert.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule
  ],
  declarations: [
      ModalAlertComponent
  ],
  exports: [
    ModalAlertComponent
  ],
})
export class ModalAlertModule { }
