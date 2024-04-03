import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { HttpErrorInfo } from "src/app/models/master.model";

import { AngularFireMessaging } from '@angular/fire/compat/messaging';

import { environment } from "src/environments/environment";
import { BaseAppService } from "./base/base.app.service";
import { PushNotificationSchema, PushNotifications } from "@capacitor/push-notifications";
import { Platform } from "@ionic/angular";

@Injectable({
	providedIn: 'root'
})

export class NotificationService extends BaseAppService {
	constructor(protected http: HttpClient, private notification: AngularFireMessaging, private platform: Platform,) {
		super(http);

		// Notification Handling
		if (this.platform.is('capacitor')) {
			PushNotifications.checkPermissions().then(result => {
				if (result.receive === 'granted')
					// Show us the notification payload if the app is open on our device
					PushNotifications.addListener('pushNotificationReceived',
						(notification: PushNotificationSchema) => {
							this.setData(notification.data);
						}
					);
			});
		}
		else {
			this.notification.messages.subscribe((notification) => {
				this.setData(notification.data);
			});
		}

		this.serviceUri = `${environment.coreServiceApiUrlV2}/Notification`;
	}

	requestPermission() {
		this.notification.requestPermission.subscribe(
			result => {
				if (result == 'granted')
					this.notification.requestToken.subscribe(
						token => {
							localStorage.setItem('fcmToken', token);
						},
						error => {
							console.error('Unable to get permission to notify.', error);
						}
					);
			});
	}

	getCartInfo(isAfterCartOperation: boolean = false) {
		return new Promise((resolve, reject) => {
			let nowTime = new Date().getTime();
			let lastGetCart = parseInt(sessionStorage.getItem('nlgc')); // notification latest get cart
			let latestData = JSON.parse(sessionStorage.getItem('nldc')); // notification latest data cart
			let maximumRefresh = 5 * 60 * 1000;

			if ((nowTime - lastGetCart) > maximumRefresh || !lastGetCart || isAfterCartOperation) {
				this.getSummary().subscribe((data) => {
					sessionStorage.setItem('nlgc', nowTime.toString());
					sessionStorage.setItem('nldc', JSON.stringify(data));
					resolve(data);
				},
					(error: HttpErrorInfo) => {
						if (error.status === 400) {
							let errorMsg = JSON.parse(error?.error?.detail);
							// console.log(errorMsg[0].ErrorMessage);
							resolve(latestData);
						}
					})
			}
			else
				resolve(latestData);
		});
	}

	getSummary() {
		return this.http.get(this.serviceUri + '/Summary', { headers: this.getHttpRequestHeader() });
	}

	getOther(query) {
		let url = this.serviceUri + '/Other?' + this.fetchJSONtoUrl(query);
		return this.http.get(url, { headers: this.getHttpRequestHeader() });
	}

	getCart() {
		return this.http.get(this.serviceUri + '/Cart', { headers: this.getHttpRequestHeader() });
	}

	getById(id: number) {
		return this.http.get(`${this.serviceUri}/${id}`, { headers: this.getHttpRequestHeader() });
	}

	setNotification(id: number) {
		return this.http.post(`${this.serviceUri}/${id}`, '', { headers: this.getHttpRequestHeader() });
	}
}