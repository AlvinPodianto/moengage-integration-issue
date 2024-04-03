import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { LogData } from "../models/log.model";
import { HttpErrorInfo } from "../models/master.model";
import { LogService, ProgressBarService } from "./../sevices";

@Injectable()

export class UploadService {
  isUploading: boolean = false;
  uploadProgress: number = 0;
  alertMsg: string;

  logData: LogData = new LogData();

  constructor(private logService: LogService, private progressBarService: ProgressBarService, private alertController: AlertController) { }

  uploadPrescription(uploader: Observable<HttpEvent<Object>>, successCallback: (res: any) => any, errorCallback: (error: HttpErrorInfo) => any, showAlert: boolean = true) {
    this.isUploading = true;
    this.progressBarService.present();
    uploader.subscribe(
      (event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
            this.progressBarService.setProgress(this.uploadProgress);
            break;

          case HttpEventType.Response:
            setTimeout(() => {
              this.uploadProgress = 0;
              this.isUploading = false;
              this.progressBarService.dismiss();
              this.logData.action = 'click';
              this.logData.responseCode = 200;
              this.logData.actionLabel = 'post upload prescription';
              this.logData.actionValue = '/Prescription/Upload';
              this.logData.codeDescription = "";
              this.logService.onSendLog(this.logData).subscribe();
              if (showAlert)
                this.presentAlert(() => successCallback(event.body['url']))
              else
                successCallback(event.body['url'])
            }, 1000);
        }
      },
      (error: HttpErrorInfo) => {
        this.logData.action = 'click';
        this.logData.responseCode = error.status;
        this.logData.actionLabel = 'post upload prescription';
        this.logData.actionValue = error.url;
        this.logData.codeDescription = error.message;
        this.logService.onSendLog(this.logData).subscribe();

        if (error.status === 400) {
          setTimeout(() => {
            this.uploadProgress = 0;
            this.isUploading = false;
            this.progressBarService.dismiss();
            this.presentErrorAlert(error, () => errorCallback(error))
          }, 1000);
        }
      }
    )
  }

  async presentAlert(OKcallback: () => any) {
    const dateNow: number = new Date().getTime();
    const dateTo: number = new Date().setHours(8, 29, 0);
    const dateFrom: number = new Date().setHours(21, 31, 0);

    if (dateNow >= dateTo && dateNow <= dateFrom) {
      this.alertMsg = "Dalam 1x15 menit kami akan menghubungi kamu untuk melakukan verifikasi resep lebih lanjut.";
    }
    else {
      this.alertMsg = "Maaf Jam operasional kami sudah lewat, Resep akan kami verifikasi di jam kerja";
    }

    const alert = await this.alertController.create({
      header: 'Upload Berhasil',
      message: this.alertMsg,
      buttons: [{
        text: 'OK',
        handler: () => OKcallback()
      }]
    });

    await alert.present();
  }

  async presentErrorAlert(error: HttpErrorInfo, errorCallback: () => any) {
    let errorMsg = error?.error?.detail;
    const alert = await this.alertController.create({
      header: 'Upload Gagal',
      message: errorMsg,
      buttons: [{
        text: 'OK',
        handler: () => errorCallback()
      }]
    });

    await alert.present();
  }
}