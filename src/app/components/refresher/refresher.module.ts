import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { RefresherComponent } from './refresher.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
      RefresherComponent
  ],
  exports: [
    RefresherComponent
  ],
})
export class RefresherModule { }
