import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { CheckButtonComponent } from './check-button.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    CheckButtonComponent
  ],
  exports: [
    CheckButtonComponent
  ],
})
export class CheckButtonModule { }
