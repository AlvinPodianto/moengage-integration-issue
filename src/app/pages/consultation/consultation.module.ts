import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultationPageRoutingModule } from './consultation-routing.module';

import { ConsultationPage } from './consultation.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultationPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [
    ConsultationPage,
  ],
  providers:[]
})

export class ConsultationPageModule {}
