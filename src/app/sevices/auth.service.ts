import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterStateSnapshot } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Device } from '@capacitor/device';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserLogin, UserInfo, JwtToken, UserForgot, UserRegister, UserLoginEmail, UserLoginSocial, UserSocmedCreatePassword, PartnerInfo, PostCreatePassword } from '../models/auth.model';
import { IAppService } from '../models/master.model';
import { environment } from 'src/environments/environment';

import { checkIfEmailInString } from '../helpers/helper';
import { env } from 'process';

//tvlk import { isPartner } from '../helpers/helper';

@Injectable({
	providedIn: 'root'
})

export class AuthService implements IAppService {
	//tvlk isPartner: boolean = false;
	protected stateSubject: BehaviorSubject<string>;
	currentState$: Observable<string>;

	protected loaderSubject: BehaviorSubject<Boolean>;
	loader$: Observable<Boolean>;

	private userLoginSubject: BehaviorSubject<UserLogin>;
	userLogin$: Observable<UserLogin>;

	// init userForgot behavior subject
	private userForgotSubject: BehaviorSubject<UserForgot>;
	public userForgot$: Observable<UserForgot>;

	// any data subject
	private dataSubject: BehaviorSubject<Object>;
	dataState$: Observable<Object>;

	private partnerInfoSubject: BehaviorSubject<PartnerInfo>;
	partnerInfo$: Observable<PartnerInfo>;

	serviceUri: string;

	checkIfEmailInString = checkIfEmailInString;

	constructor(private http: HttpClient, private router: Router) {
		//tvlk this.isPartner = isPartner();
		this.serviceUri = `${environment.coreServiceApiUrlV2}/accounts`;

		// loader: boolean ( True => Loader show; False => Loader hide )
		this.loaderSubject = new BehaviorSubject<Boolean>(false);
		this.loader$ = this.loaderSubject.asObservable();

		// State: string ( 'login' / 'otp'; )
		this.stateSubject = new BehaviorSubject<string>('');
		this.currentState$ = this.stateSubject.asObservable();

		this.currentState$.subscribe(async data => {
			var fcmToken = localStorage.getItem("fcmToken");

			if (data.toLowerCase() == 'login' && fcmToken != undefined) {
				(await this.registerUserDevice(fcmToken)).subscribe();
			}
		});

		// User Login
		this.userLoginSubject = new BehaviorSubject<UserLogin>(new UserLogin());
		this.userLogin$ = this.userLoginSubject.asObservable();

		// User Forgot Password
		this.userForgotSubject = new BehaviorSubject<UserForgot>(new UserForgot());
		this.userForgot$ = this.userForgotSubject.asObservable();

		// Other Data
		this.dataSubject = new BehaviorSubject<Object>(null);
		this.dataState$ = this.dataSubject.asObservable();

		this.partnerInfoSubject = new BehaviorSubject<PartnerInfo>(new PartnerInfo());
		this.partnerInfo$ = this.partnerInfoSubject.asObservable();
	}

	private getRequestHeaderToken(): HttpHeaders {
		let header = {
			'Content-Type': 'application/json',
			'platform': localStorage.getItem('platform') ?? 'web',
			'device-os': localStorage.getItem('device-os'),
			'device-id': localStorage.getItem('device-id'),
			'app-version': environment.version
		};

		if (localStorage.getItem('token'))
			header = Object.assign(header, { 'Authorization': `Bearer ${localStorage.getItem('token')}` });

		// if (this.isPartner)
		// 	header = Object.assign(header, { 'token': sessionStorage.getItem('partnerToken') });

		return new HttpHeaders(header);
	}

	public initTokenRefresher(frequency = 1000 * 60 * 5) {
		if (this.isRefreshToken())
			this.processRefreshToken();

		setInterval(() => {
			if (this.isRefreshToken())
				this.processRefreshToken();
		}, frequency);
	}

	isRefreshToken(): boolean {
		const helper = new JwtHelperService();

		if (!this.isUserLogin())
			return false;

		const token = localStorage.getItem('token');
		const decodedToken = helper.decodeToken(token);
		const currentTimestamp = Math.round(new Date().getTime() / 1000);

		if (decodedToken?.exp - currentTimestamp <= 3600)
			return true;
		else
			return false;
	}

	isUserLogin() {
		let refreshToken = localStorage.getItem('refreshToken');

		if (refreshToken != undefined && refreshToken != '' && refreshToken != null) {
			this.setState('logIn');
			return true;
		}
		else {
			this.setState('logOut');
			return false;
		}
	}

	processRefreshToken() {
		this.refreshToken().subscribe(
			data => this.storeToken(<JwtToken>data),
			error => this.logout()
		);
	}

	setLoader(loader: Boolean) {
		this.loaderSubject.next(loader);
	}

	setState(state: string) {
		this.stateSubject.next(state);
	}

	setData(data: Object) {
		this.dataSubject.next(data);
	}

	// show now state
	getState() {
		return this.stateSubject;
	}

	getDataState() {
		return this.dataSubject;
	}

	setUserLogin(userLogin: UserLogin) {
		this.userLoginSubject.next(userLogin);
	}

	register(userRegister: UserRegister) {
		return this.http.post(`${this.serviceUri}/Register`, JSON.stringify(userRegister), { headers: this.getRequestHeaderToken() });
	}

	loginByEmail(userLoginEmail: UserLoginEmail): Observable<Object> {
		return this.http.post(`${this.serviceUri}/Login/Password`, JSON.stringify(userLoginEmail), { headers: this.getRequestHeaderToken() });
	}

	login(userLogin: UserLogin): Observable<Object> {
		return this.http.post(`${this.serviceUri}/Login`, JSON.stringify(userLogin), { headers: this.getRequestHeaderToken() });
	}

	storeToken(jwt: JwtToken) {
		localStorage.setItem('token', jwt.accessToken);
		localStorage.setItem('refreshToken', jwt.refreshToken);
	}

	// storePartnerToken(jwt: PartnerToken) {
	// 	sessionStorage.setItem('partnerToken', jwt.token);
	// }

	logout(state: RouterStateSnapshot = null) {
		var partnerToken = sessionStorage.getItem('partnerToken');
		var intf = sessionStorage.getItem('intf');

		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('profile');
		sessionStorage.clear();

		if (partnerToken) {
			sessionStorage.setItem('partnerToken', partnerToken);
		}

		if (intf) {
			sessionStorage.setItem('intf', intf);
		}

		this.setState("logOut");

		if (state === null) {
			this.router.navigate(['/login'], { replaceUrl: true });
		}
		else {
			localStorage.setItem('LoginReturnUrl', state.url);
			this.router.navigate(['/login']), { replaceUrl: true };
		}
	}

	getOtp(input: string, otpType: string, method: string, verificationToken: string = "", values: string = "", registerType: string = "") {
		let url = this.getOtpUrl(input, otpType, method, verificationToken, values, registerType);

		return this.http.get(`${url}`, { headers: this.getRequestHeaderToken() });
	}

	verifyOtp(userLogin: UserLogin, otpType: string, changeVerification: any = null) {
		let url = this.getVerifyOtpUrl(otpType);
		var payload = (otpType == 'verification' || otpType == 'second-verification' || otpType == 'create-password')
										? changeVerification
										: userLogin;

		return this.http.post(`${url}`, payload, { headers: this.getRequestHeaderToken() });
	}

	refreshToken() {
		const refreshToken = localStorage.getItem('refreshToken');

		return this.http.get(`${this.serviceUri}/Token/Refresh?refreshToken=${refreshToken}`, { headers: this.getRequestHeaderToken() });
	}

	checkExist(username: string) {
		return this.http.get(`${this.serviceUri}/Exist?username=${username}`, { headers: this.getRequestHeaderToken() });
	}

	getUserInfo(): UserInfo {
		const helper = new JwtHelperService();

		const token = localStorage.getItem('token');
		const decodedToken = helper.decodeToken(token);

		const userInfo = new UserInfo();

		if (decodedToken !== null) {
			userInfo.userID = decodedToken.userID;
			userInfo.fullName = decodedToken.given_name;
			userInfo.customerID = decodedToken.stakeholderId;
			userInfo.customerName = decodedToken.stakeholderName;
			userInfo.email = decodedToken.email;
		}

		return userInfo;
	}

	/*====User social media start here====*/
	googleLogin(userLoginSocial: UserLoginSocial) {
		return this.http.post(`${this.serviceUri}/Login/Google`, JSON.stringify(userLoginSocial), { headers: this.getRequestHeaderToken() });
	}
	facebookLogin(userLoginSocial: UserLoginSocial) {
		return this.http.post(`${this.serviceUri}/Login/Facebook`, JSON.stringify(userLoginSocial), { headers: this.getRequestHeaderToken() });
	}
	/*====User forgot password start here====*/

	// http post -> /Accounts/Password/Forgot/Otp
	postForgotPassword(userForgot: UserForgot) {
		return this.http.post(`${this.serviceUri}/Password/Forgot`, userForgot, { headers: this.getRequestHeaderToken() });
	}
	/*====User Forgot password end=== */

	postPasswordSocmed(userSocmed: UserSocmedCreatePassword) {
		return this.http.post(`${this.serviceUri}/Password`, userSocmed, { headers: this.getRequestHeaderToken() });
	}

	async registerUserDevice(fcmToken: string) {
		var deviceId = localStorage.getItem("device-id");
		var deviceInfo = await Device.getInfo();
		var payload = {
			deviceUniqueId: deviceId,
			model: deviceInfo.model,
			resolutionWidth: window.innerWidth,
			resolutionHeight: window.innerHeight,
			osName: deviceInfo?.operatingSystem,
			osVersion: deviceInfo?.osVersion,
			firebaseToken: fcmToken
		};

		return this.http.post(`${environment.coreServiceApiUrlV1}/accounts/device/register`, payload, { headers: this.getRequestHeaderToken() });
	}

	delete() {
		return this.http.delete(`${this.serviceUri}`, { headers: this.getRequestHeaderToken() });
	}

	initSession() {
		let sessionId = sessionStorage.getItem('sessionId');

		if (sessionId == undefined || sessionId == '' || sessionId == null || sessionId == 'null') {
			return new Promise<any>((resolve, reject) => {
				this.getSessionId().subscribe(
					(data: any) => {
						resolve(data);
						sessionStorage.setItem('sessionId', data.sessionId)
					},
					error => {
						resolve(error);
					});
			});
		}
	}
	getSessionId() {
		return this.http.get(`${environment.coreServiceApiUrlV2}/Info/Session`, { headers: this.getRequestHeaderToken() });
	}

	putCustomerPhoneEmail(type: string, payload: any) {
		let url = 'Phone';

		if (type == 'email')
			url = 'Email';

		return this.http.put(`${environment.coreServiceApiUrlV2}/Customer/${url}`, payload, { headers: this.getRequestHeaderToken() });
	}
	getOtpUrl(input: string, otpType: string, method: string, verificationToken: string = "", values: string = "", registerType: string = "") {
		let url = this.serviceUri;

		switch (otpType) {
			case "login":
				url = url + `/Otp/Login/${method}?${registerType}=${input}`;
				break;

			case "forgot":
				url = url + `/Password/Forgot/Otp/Email?email=${input}`;
				break;

			case "register":
				url = url + `/Register/Otp/${method}?phone=${input}`;
				break;

			case "verification":
				url = environment.coreServiceApiUrlV2 + `/Customer/Verification/Otp/${method}?changes=${registerType}`;
				break;

			case "create-password":
				url = url + `/Password/Otp/${method}?phone=${input}`;
				break;

			case "second-verification":
				url = environment.coreServiceApiUrlV2 + `/Customer/Verification/Otp/${method}?changes=${registerType}&value=${values}&verificationToken=${verificationToken}`;
				break;

			default:
				url = url + '/Otp/Login';
				break;
		}

		return url;
	}
	getVerifyOtpUrl(otpType: string) {
		let url = this.serviceUri;
		switch (otpType) {
			case "login":
				url = url + '/Login/Otp';
				break;

			case "forgot":
				url = url + '/Password/Forgot/Otp/Verify';
				break;

			case "register":
				url = url + '/Register/Otp/Verify';
				break;

			case "verification":
				url = environment.coreServiceApiUrlV2 + `/Customer/Verification/Otp/Verify`;
				break;

			case "second-verification":
				url = environment.coreServiceApiUrlV2 + `/Customer/Verification/Otp/Verify`;
				break;

			case "create-password":
				url = url + '/Password';
				break;

			default:
				url = url + '/Login/Otp';
				break;
		}

		return url;
	}
	postCreatePassword(payload: PostCreatePassword) {
		return this.http.post(`${this.serviceUri}/Password`, JSON.stringify(payload), { headers: this.getRequestHeaderToken() });
	}
	getOtpMethods(username: string = "") {
		let qp = '';

		if (username != '')
			qp = `?username=${username}`;
		return this.http.get(`${this.serviceUri}/Otp/Methods` + qp, { headers: this.getRequestHeaderToken() });
	}
}