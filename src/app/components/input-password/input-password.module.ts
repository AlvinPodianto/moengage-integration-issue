import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InputPasswordComponent } from './input-password.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    InputPasswordComponent,
  ],
  exports: [
    InputPasswordComponent,
  ],
})
export class InputPasswordModule { }
