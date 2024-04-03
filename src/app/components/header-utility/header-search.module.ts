import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HeaderUtilityComponent } from './header-utility.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    HeaderUtilityComponent,
  ],
  exports: [
    HeaderUtilityComponent,
  ],
})
export class HeaderUtilityModule { }
