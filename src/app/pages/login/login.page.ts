import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { JwtToken, PartnerInfo, UserInfo } from 'src/app/models/auth.model';
import { ModalAuthComponent } from 'src/app/components/modal-auth/modal-auth.component';
import { AuthService, JsonLDService, LogService, NavigationService } from 'src/app/sevices';
import { LogData } from 'src/app/models/log.model';
import { checkIfEmailInString, isStrEmail, isStrPhone } from 'src/app/helpers/helper';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { accounts } from 'google-one-tap';
import { environment } from 'src/environments/environment';
import { RegisterInfoPage } from './register-info/register-info.page';
import { BehaviorSubject, Subject } from 'rxjs';
import { AccountService } from '../account/account.service';
import { Profile } from '../account/account.model';
declare var google: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit, OnDestroy {
	userInfo: UserInfo = new UserInfo();
	partnerInfo: PartnerInfo = new PartnerInfo();
	logData: LogData = new LogData();
	input: string = "";
	isValid: boolean = true;
	isDisable: boolean = false;
	registerType: string = "";
	otpType: string = "";
	isLoading: boolean = false;
	hasPassword: boolean = false;
	bannedAccount: boolean = false;
	onKeyEnter: Subject<boolean>;
	otpMethods: string[] = [];
	checkIfEmailInString = checkIfEmailInString;

	constructor(
		private accountService: AccountService,
		private ngZone: NgZone,
		private toastController: ToastController,
		private navigationService: NavigationService,
		private modalController: ModalController,
		protected authService: AuthService,
		private structureData: JsonLDService,
		private logService: LogService,
		public platform: Platform) {
		this.userInfo = this.authService.getUserInfo();
		this.authService.partnerInfo$.subscribe(x => this.partnerInfo = x);
		this.onKeyEnter = new BehaviorSubject<boolean>(false);
	}

	ngOnInit() { }

	ionViewWillEnter() {
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

		gAccounts.id.renderButton(document.getElementById('gbtn') as HTMLElement, {
			size: 'large',
			shape: 'pill',
			locale: 'id'
		});
	}

	onTyped(event) {
		this.isValid = true;
		this.checkInput();

		// if (event.key == "Enter" || event.keyCode == 13) {
		// 	this.onKeyEnter.next(true);
		// }
	}

	onPaste(event) {
		this.isValid = true;

		setTimeout(() => {
			this.checkInput();
		}, 200);

		// if (event.key == "Enter" || event.keyCode == 13) {
		// 	this.onKeyEnter.next(true);
		// }
	}

	onInput(event) {
		this.isValid = true;

		setTimeout(() => {
			this.checkInput();
		}, 200);

		// if (event.key == "Enter" || event.keyCode == 13) {
		// 	this.onKeyEnter.next(true);
		// }
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

	async presentToast(msg, color: string = 'danger') {
		const toast = await this.toastController.create({
			message: msg,
			duration: 3000,
			color: color
		});

		toast.present();
	}

	clickLayer(event, label) {
		let eventProps = {
			source: 'homePage',
			userId: this.userInfo.customerID,
			partnerCode: this.partnerInfo.partnerCode
		}
		this.structureData.clickLayer(event, label, eventProps);
	}

	async openAuthModal(input: string = "", step: number = 1, registerType: string = "") {
		const presentModel = await this.modalController.create({
			component: ModalAuthComponent,
			componentProps: {
				otpType: 'login',
				title: 'Masuk atau Daftar',
				ableBack: false,
				input: input,
				step: step,
				registerType: registerType,
				isModalPage: true,
				hasPassword: this.hasPassword,
				dPhone: input,
				dEmail: input,
				otpMethods: this.otpMethods
			},
			keyboardClose: false,
			showBackdrop: true,
			cssClass: 'fullscreen'
		});

		presentModel.onWillDismiss().then(({ data }) => {
			setTimeout(() => {
				if (data?.isSuccess)
					this.getProfile(data?.data);
				else if (data?.isSocmedLogin)
					this.getProfile(data?.data);
				else if (data?.isRedirect) {
					sessionStorage.setItem('tmpEmail', this.input);
					localStorage.getItem('LoginReturnUrl') && localStorage.getItem('token')
						? this.navigationService.navigate(localStorage.getItem('LoginReturnUrl'))
						: this.navigationService.navigate(data?.url);
				}

				localStorage.removeItem('LoginReturnUrl');
			}, 500);
		});

		return await presentModel.present();
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
				this.getProfile(data);
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

				this.presentToast(errorMsg[0].ErrorMessage, "danger");
			}
		)
	}
	
	async signInWithGoogleNative() {
		const user: any = await GoogleAuth.signIn();
		this._loginWithGoogle(user.idToken);
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
					this.navigationService.navigate('/register');
				}
			}, 500);
		});

		return await presentModel.present();
	}

	onSubmit(event) {
		this.input = event?.input;
		this.registerType = event?.registerType;
		this.otpType = event?.otpType;
		this.otpMethods = event?.otpMethods;

		if (event.isError) {
			let errorMsg = JSON.parse(event?.data?.error?.detail);
			this.isValid = false;
			this.presentToast(errorMsg[0].ErrorMessage);
		}
		else {
			this.hasPassword = event?.hasPassword;

			if (!event.isExist) {
				sessionStorage?.removeItem('tmpEmail');
				sessionStorage.setItem('tmpEmail', this.input);
				this.openModal();
			}
			else {
				this.openAuthModal(this.input, this.checkIfEmailInString(this.input) ? 1.5 : 2, this.registerType);
			}
		}
	}

	getProfile(token: any) {
		this.authService.storeToken(<JwtToken>token);
		return new Promise((resolve, reject) => {
			this.accountService.getCustomerProfile().subscribe(
				(data: Profile) => {
					this.structureData.loginLayer({
						event: "success_login",
						user_name: data?.name,
						userId: this.authService?.getUserInfo()?.customerID, 
						medium: this.registerType == 'phone'?'phone_number' : 'user_email',
						phone_number: data?.phone,
						email: data?.email,
						gender: data?.gender
					});
					this.logData.action = 'screenView';
					this.logData.responseCode = 200;
					this.logData.actionLabel = 'get profile';
					this.logData.actionValue = '/Customer/Profile';
					this.logData.codeDescription = "";
					this.logService.onSendLog(this.logData).subscribe();
					localStorage.setItem('profile', JSON.stringify(data));
					this.authService.setState('logIn');
					localStorage.getItem('LoginReturnUrl') ? this.navigationService.navigate(localStorage.getItem('LoginReturnUrl')) : this.navigationService.back();
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
					console.error(error?.error);
				}
			);
		});
	}
	ngOnDestroy(): void {
		if (localStorage.getItem('LoginReturnActPrdOffer'))
			localStorage.removeItem('LoginReturnActPrdOffer');
	}
}