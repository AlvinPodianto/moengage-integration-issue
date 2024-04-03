import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TabMenuComponent } from './tab-menu.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
      TabMenuComponent
  ],
  exports: [
    TabMenuComponent
  ],
})
export class TabMenuModule { }
