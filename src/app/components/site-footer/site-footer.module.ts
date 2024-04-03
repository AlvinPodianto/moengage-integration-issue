import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';
import { InfoService } from 'src/app/sevices';
import { SiteFooterComponent } from './site-footer.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    SiteFooterComponent
  ],
  exports: [
    SiteFooterComponent
  ],
  providers:[
    InfoService
  ]
})
export class SiteFooterModule { }
