import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { NgOtpInputComponent } from 'ng-otp-input';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { checkIfEmailInString, isStrEmail, isStrPhone, toPhoneNumberStr } from 'src/app/helpers/helper';
import { PartnerInfo, UserForgot, UserInfo } from 'src/app/models/auth.model';
import { LogData } from 'src/app/models/log.model';
import { HttpErrorInfo } from 'src/app/models/master.model';
import { RegisterInfoPage } from 'src/app/pages/login/register-info/register-info.page';
import { AuthService, CountdownService, JsonLDService, LoadingService, LogService } from 'src/app/sevices';
import { environment } from 'src/environments/environment';
import { accounts } from 'google-one-tap';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

declare var google: any;

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss'],
})

export class ModalAuthComponent implements OnInit {
  step: number = 1;
  counter: number = 0;
  tick: number = 0;
  title: string = "";
  input: string = "";
  dPhone: string = "";
  dEmail: string = "";
  values: string = "";
  password: string = "";
  registerType: string = "";
  method: string = "";
  validationErrorMsg: string = "";
  errorLabel: string = "";
  otpType: string = "";
  verificationMethod: string = "";
  passwordErrorLabel: string = "";
  passwordVerifyErrorLabel: string = "";
  infoInput: string = "";
  isModalPage: boolean = false;
  isValid: boolean = true;
  ableBack: boolean = false;
  isLoading: boolean = false;
  isDisable: boolean = false;
  isSubmit: boolean = false;
  hasPassword: boolean = false;
  bannedAccount: boolean = false;
  isChangeFormValid: boolean = false;
  isPhoneValid: boolean = false;
  // isPhoneValid: boolean = true;
  logData: LogData = new LogData();
  userInfo: UserInfo = new UserInfo();
  partnerInfo: PartnerInfo = new PartnerInfo();
  userForgot: UserForgot = new UserForgot();
  verificationToken: string = "";
  otpValue: string[] = ['', '', '', ''];
  times: number = 0;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;
  subscription: Subscription;
  config: any = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  onKeyEnter: Subject<boolean>;
  otpMethods: string[] = [];
  token: string = "";
  checkIfEmailInString = checkIfEmailInString;
  toPhoneNumberStr = toPhoneNumberStr;

  constructor(
    private loadingService: LoadingService,
    private ngZone: NgZone,
    private countdownService: CountdownService,
    private alertController: AlertController,
    private structureData: JsonLDService, protected authService: AuthService, private logService: LogService, private router: Router, private toastController: ToastController, private modalController: ModalController, public platform: Platform) {
    this.onKeyEnter = new BehaviorSubject<boolean>(false);
  }

  ngOnInit() {
    if (sessionStorage.getItem('tmpEmailrdr'))
      sessionStorage.removeItem('tmpEmailrdr');

    this.countdownService.newTimer();
    this.countdownService.startTimer(1, 0);
    this.countdownService.onCountDownCounter.subscribe((v) => {
      this.times = v;
    });

    const afterLoginAct = localStorage.getItem('LoginReturnAct');
    localStorage.removeItem('LoginReturnAct');

    if (afterLoginAct)
      if (localStorage.getItem('LoginReturnUrl').includes('?sid=')) {
        localStorage.setItem('LoginReturnUrl', localStorage.getItem('LoginReturnUrl') + '&return-act=' + afterLoginAct);
      }
      else {
        localStorage.setItem('LoginReturnUrl', localStorage.getItem('LoginReturnUrl') + '?return-act=' + afterLoginAct);
      }
  }
  
  ionViewWillEnter() {
    this.token = localStorage?.getItem('token');

    if (!this.platform.is('capacitor')) {
      const gAccounts: accounts = google.accounts;
      gAccounts.id.initialize({
        client_id: environment.googleClientId,
        ux_mode: 'popup',
        cancel_on_tap_outside: true,
        callback: ({ credential }) => {
          this.ngZone.run(() => {
            this._loginWithGoogle(credential);
          });
        },
      });

      gAccounts.id.renderButton(document.getElementById('gbtn2') as HTMLElement, {
        size: 'large',
        shape: 'pill',
        locale: 'id'
      });
    }

    if (this.otpType == 'second-verification' && this.registerType == 'email')
      this.values = this.dEmail;

    if (this.otpType == 'second-verification' && this.registerType == 'phone')
      this.values = this.dPhone;
  }

  onClickEv(resData) {
    this.modalController.dismiss({
      result: resData
    });
  }

  checkInput() {
    if (isStrPhone(this.input)) {
      if (this.input.length > 9) {
        if (this.input.substr(0, 3) == "+62") {
          this.isDisable = true;
        }
        else if (this.input.substr(0, 2) == "08") {
          this.isDisable = true;
        }
        else if (this.input.substr(0, 2) == "62") {
          this.isDisable = true;
        }
        else {
          this.isDisable = false;
        }
      }
      else {
        this.isDisable = false;
      }
    }
    else if (isStrEmail(this.input)) {
      this.isDisable = true;
    }
    else {
      this.isDisable = false;
    }
  }

  onTyped(event) {
    this.isValid = true;
    this.checkInput();

    if (event.key == "Enter" || event.keyCode == 13) {
      this.onKeyEnter.next(true);
    }
  }

  onTypedPw(event) {
    this.isValid = true;
    this.errorLabel = "";

    if (event.key == "Enter" || event.keyCode == 13) {
      this.doLogin();
    }
  }

  onPaste(event) {
    this.isValid = true;

    setTimeout(() => {
      this.checkInput();
    }, 200);

    if (event.key == "Enter" || event.keyCode == 13) {
      this.onKeyEnter.next(true);
    }
  }

  onInput(event) {
    this.isValid = true;

    setTimeout(() => {
      this.checkInput();
    }, 200);

    if (event.key == "Enter" || event.keyCode == 13) {
      this.onKeyEnter.next(true);
    }
  }

  clickLayer(event, label) {
    let eventProps = {
      source: 'homePage',
      userId: this.userInfo.customerID,
      partnerCode: this.partnerInfo.partnerCode
    }
    this.structureData.clickLayer(event, label, eventProps);
  }

  async presentToast(msg, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color
    });

    toast.present();
  }

  formatNumber() {
    var phone = this.input.replace('62', '+62 ');
    return phone;
  }

  zeroAdder(num: number) {
    let strNum = num.toString();
    if (num < 10)
      strNum = "0" + strNum;
    return strNum;
  }

  initOtp() {
    this.otpValue = ['', '', '', ''];
    this.isSubmit = false;
    this.isLoading = false;

    this.isValid = true;
    this.validationErrorMsg = "";
  }

  initTimer() {
    this.counter = 30;
    this.countdownService.startTimer(1, this.counter);
  }

  onOtpChange(otp) {
    this.otpValue = otp.split('');
    let hasNotWhiteSpace: boolean = !this.otpValue.includes("");

    if (hasNotWhiteSpace && !this.isSubmit && this.otpValue.length == 4) {
      this.isLoading = true;
      this.isSubmit = true;

      this.initTimer()
      this.submitOtp();

      return;
    }
  }

  generateOtp(method: string) {
    this.isLoading = true;
    this.loadingService.present();
    this.method = method;
    this.clickLayer('clickPhoneLoginResendOTP', 'Resend OTP');

    this.authService.getOtp(this.input, this.otpType, this.method, this.verificationToken, this.values, this.registerType)
      .subscribe(
        (data: any) => {
          var url = this.authService.getOtpUrl(this.input, this.otpType, this.method);
          this.logData.action = 'screenView';
          this.logData.responseCode = 200;
          this.logData.actionLabel = 'get OTP';
          this.logData.actionValue = '/Customer' + url + '?phone=' + this.input + '&method=' + method;
          this.logData.codeDescription = "";
          this.logService.onSendLog(this.logData).subscribe();

          if (data.otpSent) {
            this.step = 3;
            this.presentToast("Kode OTP Berhasil Dikirim", "success");
            this.initTimer();
            this.initOtp();
          }

          this.isLoading = false;
          this.loadingService.dismiss();
        },
        (error) => {
          this.logData.action = 'screenView';
          this.logData.responseCode = error.status;
          this.logData.actionLabel = 'get OTP';
          this.logData.actionValue = error.url;
          this.logData.codeDescription = error.message;
          this.logService.onSendLog(this.logData).subscribe();

          if (error.status === 429) {
            // console.error("Error  : ", error)
            let errorMsg = error['error'];
            this.validationErrorMsg = errorMsg || "";
            this.presentToast(errorMsg, "danger");
          } else {
            // console.error("Error  : ", error)
            let errorMsg = JSON.parse(error?.error?.detail);
            // console.log(errorMsg[0].PropertyName);
            if (errorMsg[0].PropertyName == "Sms_Blacklist") {
              this.bannedAccount = true;
            }
            if (errorMsg[0].PropertyName == "Phone" && this.otpType == 'register') {
              this.modalController.dismiss({})
            }

            this.validationErrorMsg = errorMsg[0]?.ErrorMessage || "";
            this.presentToast(errorMsg[0].ErrorMessage, "danger");
          }
          this.isLoading = false;
          this.loadingService.dismiss();
        }
      );
  }

  submitOtp() {
    this.loadingService.present();
    let otpPayload = this.otpValue.join("");
    let changeVerification = null;

    if (this.otpType == 'verification')
      changeVerification = {
        otp: otpPayload,
        method: this.method
      };

    if (this.otpType == 'second-verification')
      changeVerification = {
        otp: otpPayload,
        method: this.method,
        value: this.input
      };

    if (this.otpType == 'create-password')
      changeVerification = {
        phone: this.input,
        password: this.password,
        otp: otpPayload
      };

    this.authService.verifyOtp({ phone: this.input, otp: otpPayload }, this.otpType, changeVerification)
      .subscribe(
        (data: any) => {
          var link = this.authService.getVerifyOtpUrl(this.otpType)
          this.logData.action = 'click';
          this.logData.responseCode = 200;
          this.logData.actionLabel = 'post customer verify OTP';
          this.logData.actionValue = '/Customer' + link;
          this.logData.codeDescription = "";
          this.logService.onSendLog(this.logData).subscribe();
          this.isLoading = false;
          this.isSubmit = false;

          if (this.otpType == 'forgot')
            this.modalController.dismiss({ isSuccess: true, data: data?.forgotPasswordToken });
          else if (this.otpType == 'verification')
            this.modalController.dismiss({ isSuccess: true, data: { verificationToken: data?.verificationToken, value: this.input, registerType: this.registerType, otpType: this.otpType } });
          else if (this.otpType == 'second-verification')
            this.modalController.dismiss({ isSuccess: true, data: { verificationToken: data?.verificationToken, value: this.input, registerType: this.registerType }, otpType: this.otpType });
          else if (this.otpType == 'create-password')
            this.modalController.dismiss({ isSuccess: true, data: { phone: this.input, password: this.password, otp: otpPayload } });
          else
            this.modalController.dismiss({ isSuccess: true, data: data });

          this.loadingService.dismiss();
        },
        (error: HttpErrorInfo) => {
          this.logData.action = 'click';
          this.logData.responseCode = error.status;
          this.logData.actionLabel = 'post customer verify OTP';
          this.logData.actionValue = error.url;
          this.logData.codeDescription = error.message;
          this.logService.onSendLog(this.logData).subscribe();
          this.isLoading = false;
          this.isSubmit = false;
          this.isValid = false;

          if (error.status === 429) {
            // console.error("Error  : ", error)
            let errorMsg = JSON.parse(error?.error?.detail);

            this.validationErrorMsg = errorMsg || "";
            this.presentToast(errorMsg, "danger");
          }

          if (error.status === 400) {
            // console.error("Error  : ", error);
            let errorMsg = JSON.parse(error?.error?.detail);
            if (errorMsg[0].PropertyName == "Sms_Blacklist") {
              this.bannedAccount = true;
            }

            this.validationErrorMsg = errorMsg[0]?.ErrorMessage || "";
            this.presentToast(errorMsg[0].ErrorMessage, "danger");
            this.loadingService.dismiss();
          }
        }
      )
  }

  doLogin() {
    this.clickLayer('clickLoginWithEmail', 'Login with Email');
    this.isLoading = true;

    this.authService.loginByEmail({
      username: this.input,
      password: this.password
    }).subscribe(
      (data) => {
        this.logData.action = 'click';
        this.logData.responseCode = 200;
        this.logData.actionLabel = 'post login by email';
        this.logData.actionValue = '/Login/Password';
        this.logData.codeDescription = "";
        this.logService.onSendLog(this.logData).subscribe();
        this.isLoading = false;
        // load auth layout
        this.authService.setLoader(true);
        this.modalController.dismiss({ isSuccess: true, data: data });
      },
      (error: HttpErrorInfo) => {
        this.logData.action = 'screenView';
        this.logData.responseCode = error.status;
        this.logData.actionLabel = 'post login by email';
        this.logData.actionValue = error.url;
        this.logData.codeDescription = error.message;
        this.logService.onSendLog(this.logData).subscribe();
        this.isLoading = false;
        this.isValid = false;

        if (error.status === 400) {
          // console.error("Error  : ", error)
          let errorMsg = JSON.parse(error?.error?.detail);

          this.errorLabel = errorMsg[0].ErrorMessage;

          this.presentToast(this.errorLabel);
        }
      }
    );
  }

  splitPhone(phone: any) {
    if (!this.checkIfEmailInString(phone))
      return "+" + phone.slice(0, 2) + ' ' + '***-****-**' + phone.slice(-2);
    else
      return phone;
  }

  resetPw() {
    this.modalController.dismiss({ isRedirect: true, url: '/reset-password', tmpEmail: this.input });
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: "Kata sandi berhasil diperbaharui. Silahkan login kembali untuk masuk.",
      buttons: ['OK']
    });

    alert.onDidDismiss().then(() => {
      this.modalController.dismiss({ irpr: true, url: '/login', tmpEmailrdr: this.userForgot.username });
    });

    await alert.present();
  }

  async openModal() {
    const presentModel = await this.modalController.create({
      component: RegisterInfoPage,
      componentProps: {
        username: this.input,
        type: this.registerType
      },
      showBackdrop: true,
      cssClass: 'srx-bottom-sheet'
    });

    presentModel.onWillDismiss().then(({ data }) => {
      setTimeout(() => {
        if (data?.isRegister) {
          if (this.otpType == 'tmpRegister')
            this.modalController.dismiss({ isTmpRegister: true, tmpEmail: this.input })
          else
            this.modalController.dismiss({ isRedirect: true, url: '/register', tmpEmail: this.input });
        }
      }, 500);
    });

    return await presentModel.present();
  }

  dissmissHandler() {
    this.modalController.dismiss();
  }

  private _loginWithGoogle(token: string) {
    this.clickLayer('clickLoginGoogle', 'Login with Google');
    this.authService.googleLogin({ providerToken: token }).subscribe(
      (data) => {
        this.logData.action = 'click';
        this.logData.responseCode = 200;
        this.logData.actionLabel = 'post google login';
        this.logData.actionValue = '/Login/Google';
        this.logData.codeDescription = "";
        this.logService.onSendLog(this.logData).subscribe();
        this.modalController.dismiss({ isSocmedLogin: true, data: data });
      },
      (error) => {
        this.logData.action = 'click';
        this.logData.responseCode = error.status;
        this.logData.actionLabel = 'post google login';
        this.logData.actionValue = error.url;
        this.logData.codeDescription = error.message;
        this.logService.onSendLog(this.logData).subscribe();
        let errorMsg = JSON.parse(error?.error?.detail);

        if (errorMsg[0].PropertyName == "Sms_Blacklist") {
          this.bannedAccount = true;
        }

        this.validationErrorMsg = errorMsg[0]?.ErrorMessage || "";
        this.presentToast(errorMsg[0].ErrorMessage, "danger");
      }
    )
  }
  async signInWithGoogleNative() {
    const user: any = await GoogleAuth.signIn();
    this._loginWithGoogle(user.idToken);
  }

  onSubmit(event) {
    this.input = event?.input;
    this.registerType = event?.registerType;
    this.otpMethods = event?.otpMethods;

    if (event.isError) {
      let errorMsg = JSON?.parse(event?.error?.error?.detail);
      this.isValid = false;
      this.presentToast(errorMsg[0].ErrorMessage)
    } else {
      if (!event.isExist) {
        if (this.otpType != 'verification') {
          if (this.otpType != 'tmpRegister' && this.otpType != 'create-password') {
            this.openModal();
          } else {
            if (this.otpType == 'create-password') {
              this.step = 2;
            } else {
              this.modalController.dismiss({ isTmpRegister: true, tmpEmail: this.input })
            }
          }
        } else {
          this.input = this.registerType == 'email' ? this.input : this.input.replace('+62', '62');
          this.step = 2;
        }
      }
      this.hasPassword = event?.hasPassword;
    }

    this.isLoading = false;

    if (this.otpType != 'verification') {
      if (this.otpType != 'tmpRegister' && this.otpType != 'create-password') {
        if (this.registerType == 'phone')
          this.step = 2;
        else if (this.registerType == 'email')
          this.step = 1.5;
      } else {
        this.presentToast((checkIfEmailInString(this.input) ? 'Email' : 'Nomor Ponsel') + ' sudah terdaftar', "danger");
      }
    } else {
      this.isChangeFormValid = false;
      this.infoInput = this.registerType == 'email' ? "Email" : "Nomor Telepon" + " tersebut sudah digunakan, mohon gunakan nomor berbeda";
    }
  }
} 
