import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { MessageModalComponent } from './message-modal.component';
import { HeaderModule } from '../header/header.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    FormsModule
  ],
  declarations: [
    MessageModalComponent
  ],
  exports: [
    MessageModalComponent
  ],
})
export class MessageModalModule { }
