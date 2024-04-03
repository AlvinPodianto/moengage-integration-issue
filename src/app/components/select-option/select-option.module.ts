import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { OptionModalComponent } from './option-modal/option-modal.component';
import { SelectOptionComponent } from './select-option.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HeaderModule
  ],
  declarations: [
      SelectOptionComponent,
      OptionModalComponent
  ],
  exports: [
    SelectOptionComponent
  ],
})
export class SelectOptionModule { }
