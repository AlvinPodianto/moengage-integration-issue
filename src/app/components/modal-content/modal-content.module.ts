import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ModalContentComponent } from './modal-content.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule
  ],
  declarations: [
    ModalContentComponent
  ],
  exports: [
    ModalContentComponent
  ],
})
export class ModalContentModule { }
