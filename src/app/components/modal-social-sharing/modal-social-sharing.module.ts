import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ModalSocialSharingComponent } from './modal-social-sharing.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule
  ],
  declarations: [
      ModalSocialSharingComponent
  ],
  exports: [
    ModalSocialSharingComponent
  ],
})
export class ModalSocialSharingModule { }
