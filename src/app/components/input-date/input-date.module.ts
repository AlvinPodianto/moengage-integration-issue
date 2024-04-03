import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InputDateComponent } from './input-date.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    InputDateComponent,
  ],
  exports: [
    InputDateComponent,
  ],
})
export class InputDateModule { }
