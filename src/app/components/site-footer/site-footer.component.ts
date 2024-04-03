import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular'; 
import { HttpErrorInfo, IInfo } from 'src/app/models/master.model';
import { LogData } from 'src/app/models/log.model';  
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { InfoService, LogService } from 'src/app/sevices';

@Component({
  selector: 'site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
})

export class SiteFooterComponent implements OnInit {
  contactInfo: IInfo = undefined;
  logData: LogData = new LogData();

  constructor(private logService: LogService, private modalController: ModalController, private infoService: InfoService,
    public platform: Platform) {
    let contactInfo = sessionStorage.getItem('cinfo');

    if (contactInfo != undefined && (contactInfo != '' && contactInfo != 'null'))
      this.contactInfo = JSON.parse(sessionStorage.getItem('cinfo'));
    else
      this.getContactInfo()
        .then((data: IInfo) => this.contactInfo = data)
        .then(() => {
          sessionStorage.setItem('cinfo', JSON.stringify(this.contactInfo))
        });
  }

  ngOnInit() { }

  getContactInfo() {
    return new Promise((resolve, reject) => {
      this.infoService.getContactInfo().toPromise().then(
        (data: IInfo) => {
          this.logData.action = 'screenView';
          this.logData.responseCode = 200;
          this.logData.actionLabel = 'get contact info';
          this.logData.actionValue = '/Info/Contact';
          this.logData.codeDescription = "";
          this.logService.onSendLog(this.logData).subscribe();

          resolve(data)
        },
        (error: HttpErrorInfo) => {
          this.logData.action = 'screenView';
          this.logData.responseCode = error.status;
          this.logData.actionLabel = 'get contact info';
          this.logData.actionValue = error.url;
          this.logData.codeDescription = error.message;
          this.logService.onSendLog(this.logData).subscribe();

          if (error.status === 400) {
            let errorMsg = JSON.parse(error?.error?.detail);
            reject(error);
          }
        }
      );
    });
  }

  async openContactModal() {
    let alert = await this.modalController.create({
      component: ModalContentComponent,
      cssClass: "modal-content",
      componentProps: {
        title: "Hubungi Kami"
      },
    });

    await alert.present();
  }
}
