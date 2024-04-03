import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CircleProgressModule } from './circleprogress/circleprogress.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { HeaderUtilityModule } from './header-utility/header-search.module';

/* shared module */
import { HeaderModule } from './header/header.module';
import { InputDateModule } from './input-date/input-date.module';
import { InputPasswordModule } from './input-password/input-password.module';
import { InputTextModule } from './input-text/input-text.module';
import { ModalAlertModule } from './modal-alert/modal-alert.module'; 
import { ModalContentModule } from './modal-content/modal-content.module';
import { ModalSocialSharingModule } from './modal-social-sharing/modal-social-sharing.module';
import { NoResultModule } from './no-result/no-result.module';
import { ProgressBarModule } from './progress-bar/progress-bar.module'; 
import { RefresherModule } from './refresher/refresher.module';
import { SelectOptionModule } from './select-option/select-option.module'; 
import { TabMenuModule } from './tab-menu/tab-menu.module';
import { ModalAuthModule } from './modal-auth/modal-auth.module';
import { SiteFooterModule } from './site-footer/site-footer.module';
import { CheckButtonModule } from './check-button/check-button.module';
import { MessageModalModule } from './message-modal/message-modal.module';
import { HeaderAppModule } from './header-app/header-app.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    InputTextModule,
    InputPasswordModule,
    InputDateModule,
    RefresherModule,
    SelectOptionModule,
    ModalAlertModule,
    TabMenuModule,
    NoResultModule,
    ProgressBarModule,
    ModalSocialSharingModule,
    HeaderUtilityModule,
    SiteFooterModule,
    FileUploaderModule,
    CircleProgressModule, 
    ModalContentModule,
    ModalAuthModule,
    CheckButtonModule, 
    MessageModalModule,
    HeaderAppModule
  ],
  declarations: [
  ],
  providers: [DatePipe],
  exports: [
    HeaderModule,
    InputTextModule,
    InputPasswordModule,
    InputDateModule,
    RefresherModule,
    SelectOptionModule,
    ModalAlertModule,
    TabMenuModule,
    NoResultModule,
    ProgressBarModule,
    ModalSocialSharingModule,
    HeaderUtilityModule,
    SiteFooterModule,
    FileUploaderModule,
    CircleProgressModule, 
    ModalContentModule,
    ModalAuthModule,
    CheckButtonModule, 
    MessageModalModule,
    HeaderAppModule
  ],
})
export class SharedComponentModule { }
