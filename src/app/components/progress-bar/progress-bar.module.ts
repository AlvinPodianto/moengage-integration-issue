import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
      ProgressBarComponent
  ],
  exports: [
    ProgressBarComponent
  ],
})
export class ProgressBarModule { }
