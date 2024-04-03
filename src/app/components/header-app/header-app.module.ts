import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderAppComponent } from './header-app.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    HeaderAppComponent,
  ],
  exports: [
    HeaderAppComponent,
  ],
})
export class HeaderAppModule { }
