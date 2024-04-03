import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ModalFilterComponent } from './modal-filter.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    FormsModule
  ],
  declarations: [
      ModalFilterComponent
  ],
  exports: [
    ModalFilterComponent
  ],
})
export class ModalFilterModule { }
