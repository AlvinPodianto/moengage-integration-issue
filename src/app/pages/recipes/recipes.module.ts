import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

import { RecipesPage } from './recipes.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

import { PrescriptionService, UploadService } from 'src/app/sevices';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [RecipesPage],
  providers: [PrescriptionService, UploadService]
})

export class RecipesPageModule { }
