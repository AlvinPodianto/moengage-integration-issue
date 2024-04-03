import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular'; 
import { CircleProgressModule } from '../circleprogress/circleprogress.module';
import { FileUploaderComponent } from './file-uploader.component';
import { FileUploaderService } from './file-uploader.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CircleProgressModule
  ],
  declarations: [
    FileUploaderComponent,
  ],
  exports: [
    FileUploaderComponent,
  ],
  providers:[FileUploaderService]
})
export class FileUploaderModule { }
