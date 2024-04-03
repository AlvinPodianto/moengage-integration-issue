import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from './input-text.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SharedDirectivesModule
  ],
  declarations: [
    InputTextComponent,
  ],
  exports: [
    InputTextComponent,
  ],
})
export class InputTextModule { }
