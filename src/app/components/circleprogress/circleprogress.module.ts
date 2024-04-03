import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';  
import { CircleProgress } from './circleprogress.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    CircleProgress,
  ],
  exports: [
    CircleProgress,
  ]
})
export class CircleProgressModule { }
