import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController, Platform } from '@ionic/angular';
import { isMobileDevice } from 'src/app/helpers/helper';
import { LogData } from 'src/app/models/log.model';
import { Profile } from './account.model';
import { AccountService } from './account.service';
import packageJson from '../../../../package.json';
import { ModalBarcodeComponent } from 'src/app/components/modal-barcode/modal-barcode.component';
import { AuthService, LoadingService, LogService, NavigationService, ToastService } from 'src/app/sevices';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  profile: Profile = new Profile();
  currentSlideIndex: number = 1;

  public version: string = packageJson.version;

  slideOptsOne: any = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 1500
  };

  isShowNavigation: boolean = false;
  isMobileDevice = isMobileDevice;
  logData: LogData = new LogData();

  constructor(
    private logService: LogService,
    private router: Router,
    public platform: Platform,
    private authService: AuthService,
    protected accountService: AccountService,
    protected loadingService: LoadingService,
    private navigationService: NavigationService,
    private toastService: ToastService,
    private modalController: ModalController) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.getProfile();
  }

  onBack() {
    this.router.navigate(["/register"]);
  }

  logout() {
    this.authService.logout();
    this.navigationService.reset();

    // unregister fcmtoken
    //if (!this.platform.is('capacitor'))

    // unregister fcmtoken
    //PushNotifications.unregister();

    //window.location.reload();

    this.loadingService.present(1000);
  }

  doRefresh(event) {
    this.getProfile().then(
      () => {
        event.target.complete();
      }
    );
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.loadingService.present();

      this.accountService.getCustomerProfile().subscribe(
        (data: Profile) => {
          this.logData.action = 'screenView';
          this.logData.responseCode = 200;
          this.logData.actionLabel = 'get profile';
          this.logData.actionValue = '/Customer/Profile';
          this.logData.codeDescription = "";
          this.logService.onSendLog(this.logData).subscribe();
          this.loadingService.dismiss();
          this.profile = data;
          localStorage.setItem('profile', JSON.stringify(this.profile));
          resolve(null);
        },
        (error) => {
          this.logData.action = 'screenView';
          this.logData.responseCode = error.status;
          this.logData.actionLabel = 'get profile';
          this.logData.actionValue = error.url;
          this.logData.codeDescription = error.message;
          this.logService.onSendLog(this.logData).subscribe();
          reject(error);
          this.loadingService.dismiss();
          console.error(error?.error);
        }
      );
    });
  }

  showNavHandler() {
    if (!isMobileDevice())
      this.isShowNavigation = true;
  }

  hideNavHandler = () => this.isShowNavigation = false;

  //Method called when slide is changed by drag or navigation
  slideDidChangeHandler() {
    this.slides.getActiveIndex().then(
      (index) => {
        this.currentSlideIndex = index + 1;
      });
  }

  cardFormat(cardNumber) {
    return cardNumber.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastService.presentToast('Nomor Membership Berhasil di Salin', 'secondary')
  }

  async showModalQr() {
    let alert = await this.modalController.create({
      component: ModalBarcodeComponent,
      componentProps: {
        title:"Membership",
        caption:"Dapat digunakan untuk berbelanja di Farmaku.",
        cardNumber: this.profile.cardNumber,
        name: this.profile.name,
        cardNumberDisplay: this.cardFormat(this.profile.cardNumber),
      },
      backdropDismiss: false,
      showBackdrop: true,
      cssClass: "modal-membership"
    });

    alert.onDidDismiss().then(({ data }) => {
    });

    await alert.present();
  }
}
