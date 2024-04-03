import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ModalAuthComponent } from './modal-auth.component'; 
import { InputPasswordModule } from '../input-password/input-password.module';
import { InputTextModule } from '../input-text/input-text.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { CheckButtonModule } from '../check-button/check-button.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    InputTextModule,
    InputPasswordModule,
    NgOtpInputModule, 
    CheckButtonModule
  ],
  declarations: [
    ModalAuthComponent
  ],
  exports: [
    ModalAuthComponent
  ], 
  providers:[TitleCasePipe] 
})
export class ModalAuthModule { }
