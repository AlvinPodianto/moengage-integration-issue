import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtToken, UserRegister } from 'src/app/models/auth.model';
import { HttpErrorInfo } from 'src/app/models/master.model';
import { checkIfEmailInString, isStrPhone, toPhoneNumberStr } from 'src/app/helpers/helper';
import { AccountService } from '../account/account.service';
import { Profile } from '../account/account.model';
import { LogData } from 'src/app/models/log.model';
import { AuthService, JsonLDService, LogService, NavigationService, ToastService } from 'src/app/sevices';
import { ModalAuthComponent } from 'src/app/components/modal-auth/modal-auth.component';
import { ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
	userRegister: UserRegister = new UserRegister();
	passwordVerify: string = "";
	isRePasswordValid: boolean = true;
	isPasswordValid: boolean = true;
	registerType: string = "";
	isInputValid: boolean = true;
	isLoading: boolean = false;
	passwordErrorInfo: string = "Kata sandi harus terdiri dari 7 karakter atau lebih";
	rePasswordErrorInfo: string = "Kata sandi harus sesuai dengan diatas";
	isBtnDisabled: boolean = false;
	isPhoneValid: boolean = true;
	phoneErrorInfo: string = "";
	logData: LogData = new LogData();
	onKeyEnter: Subject<boolean>;
	otpMethods: string[] = [];
	checkIfEmailInString = checkIfEmailInString;
	toPhoneNumberStr = toPhoneNumberStr;

	constructor(
		private structureData: JsonLDService,
		private modalController: ModalController,
		private logService: LogService,
		private router: Router,
		private toastService: ToastService,
		private authService: AuthService,
		public navigationService: NavigationService,
		protected accountService: AccountService,
		private toastController: ToastController) {
		this.onKeyEnter = new BehaviorSubject<boolean>(false);
	}

	ngOnInit() {
		if (!sessionStorage.getItem('tmpEmail')) {
			this.navigationService.navigate('404');
		}
	}
	ionViewWillEnter() {
		if (sessionStorage.getItem('tmpEmail')) {
			if (checkIfEmailInString(sessionStorage.getItem('tmpEmail')))
				this.registerType = 'email',
					this.userRegister.email = sessionStorage.getItem('tmpEmail');
			else
				this.registerType = 'phone',
					this.userRegister.phone = sessionStorage.getItem('tmpEmail');
		} else {
			this.navigationService.navigate('404');
			// this.openAuthModal('tmpRegister', 1);
		}
	}
	onTypeInput() {
		this.isInputValid = true;
	}
	onTypeInputPhone(event) {
		this.isInputValid = true;
		this.phoneErrorInfo = "";
		this.isPhoneValid = true;
		this.isBtnDisabled = false;
		if (isStrPhone(event.target.value)) {
			if (event.target.value[0] == "+")
				event.target.value = event.target.value.substr(1, event.target.value.length);

			if (event.target.value.substr(0, 2) == "08")
				event.target.value = "628" + event.target.value.substr(2, event.target.value.length);

			this.userRegister.phone = event.target.value;
		}
		else {
			event.target.value = this.userRegister.phone;
		}

		if (isStrPhone(event.target.value)) {
			if (event.target.value.length > 9) {
				if (event.target.value.substr(0, 3) == "+62") {
					this.isBtnDisabled = false;
				} else if (event.target.value.substr(0, 2) == "08") {
					this.isBtnDisabled = false;
				} else if (event.target.value.substr(0, 2) == "62") {
					this.isBtnDisabled = false;
				} else {
					this.isBtnDisabled = true;
				}
			} else {
				this.isBtnDisabled = true;
			}
		}
	}

	onPasteInputPhone(event) {
		setTimeout(() => {
			this.onTypeInputPhone(event);
		}, 300);
	}

	onTypePasswordValidation() {
		if (this.userRegister.password.length < 7) {
			this.isPasswordValid = false;
			this.passwordErrorInfo = "Kata sandi harus terdiri dari 7 karakter atau lebih";
			return;
		}
		else {
			this.isPasswordValid = true;
			this.passwordErrorInfo = "";
		}

		if (this.userRegister.password !== this.passwordVerify) {
			this.isRePasswordValid = false;
			this.rePasswordErrorInfo = "Kata sandi harus sama";
			return;
		}

		this.isInputValid = true;
		this.isRePasswordValid = true;
		this.rePasswordErrorInfo = "";
	}

	validationInputCheck() {
		let field = "";
		let alwaysValidField = ['registrationToken', 'referralCode', 'email'];

		for (let item in this.userRegister) {
			if (this.userRegister[item] == "" && !alwaysValidField.includes(item)) {
				field += item + ", ";
			}
		}

		if (!this.passwordVerify || this.passwordVerify !== this.userRegister.password) {
			this.isRePasswordValid = false;

			return false;
		}

		if (field.length) {
			this.isInputValid = false;
			this.showErrorMsg(field + " Tidak boleh kosong");

			return false;
		}

		return true;
	}

	doRegister() {
		this.authService.register(this.userRegister).subscribe(
			(data) => {
				this.logData.action = 'click';
				this.logData.responseCode = 200;
				this.logData.actionLabel = 'post customer register';
				this.logData.actionValue = '/Accounts/Register';
				this.logData.codeDescription = "";
				this.logService.onSendLog(this.logData).subscribe();
				//store token
				this.getProfile(data);
			},
			(error: HttpErrorInfo) => {
				this.logData.action = 'click';
				this.logData.responseCode = error.status;
				this.logData.actionLabel = 'post customer register';
				this.logData.actionValue = error.url;
				this.logData.codeDescription = error.message;
				this.logService.onSendLog(this.logData).subscribe();
				this.isBtnDisabled = false;

				if (error.status === 400) {
					// console.error("Error  : ", error)
					let errorMsg = JSON.parse(error?.error?.detail);

					this.showErrorMsg(errorMsg[0].ErrorMessage);
				}
			},
			() => {
				this.isBtnDisabled = false;
			}
		);
	}
	showErrorMsg(msg) {
		this.isInputValid = false;
		this.toastService.presentToast(msg, "danger");
	}

	async openAuthModal(otpType: string, step: number) {
		const presentModel = await this.modalController.create({
			component: ModalAuthComponent,
			componentProps: {
				otpType: otpType,
				title: 'Daftar Sekarang',
				ableBack: false,
				input: this.userRegister.phone,
				step: step,
				dPhone: this.userRegister.phone,
				dEmail: this.userRegister.email,
				otpMethods: this.otpMethods,
				isModalPage: true
			},
			keyboardClose: false,
			showBackdrop: true,
			cssClass: 'fullscreen'
		});

		presentModel.onWillDismiss().then(({ data }) => {
			setTimeout(() => {
				if (data?.isTmpRegister) {
					if (checkIfEmailInString(data?.tmpEmail))
						this.registerType = 'email',
							this.userRegister.email = data?.tmpEmail;
					else
						this.registerType = 'phone',
							this.userRegister.phone = data?.tmpEmail;
				}
				if (data?.data?.registrationToken) {
					this.userRegister.registrationToken = data?.data?.registrationToken;
					this.doRegister();
					sessionStorage.removeItem('tmpEmail');
				}
			}, 500);
		});

		return await presentModel.present();
	}

	onSubmit(event) {
		this.otpMethods = event?.otpMethods;
		if (event.isError) {
			let errorMsg = JSON.parse(event?.data?.error?.detail);
			this.presentToast(errorMsg[0].ErrorMessage)
		} else {
			if (!event.isExist) {
				this.openAuthModal('register', 2);
			} else {
				this.isPhoneValid = false;
				this.presentToast('Nomor Telepon tersebut sudah digunakan, mohon gunakan nomor berbeda')
			}
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
	getProfile(token: any) {
		this.authService.storeToken(<JwtToken>token);
		return new Promise((resolve, reject) => {
			this.accountService.getCustomerProfile().subscribe(
				(data: Profile) => {
					this.structureData.registerLayer({
						event: "registration_completed",
						user_name: data?.name,
						userId: this.authService?.getUserInfo()?.customerID,
						medium: this.registerType == 'phone' ? 'phone_number' : 'user_email',
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
					this.navigationService.back();
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
}
