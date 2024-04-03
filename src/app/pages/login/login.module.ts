import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular'; 
import { LoginPageRoutingModule } from './login-routing.module'; 
import { LoginPage } from './login.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module'; 
import { RegisterInfoPage } from './register-info/register-info.page'; 
import { AccountService } from '../account/account.service'; 
import { AuthService } from 'src/app/sevices';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [
    LoginPage, 
    RegisterInfoPage
  ],
  providers:[
    AccountService,
    AuthService
  ]
})
export class LoginPageModule {}
