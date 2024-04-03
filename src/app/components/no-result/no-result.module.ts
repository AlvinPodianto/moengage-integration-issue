import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { NoResultComponent } from './no-result.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    NoResultComponent
  ],
  exports: [
    NoResultComponent
  ],
})
export class NoResultModule { }
