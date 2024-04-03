import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { BaseAppService } from 'src/app/sevices/base/base.app.service';

@Injectable()
export class AccountService extends BaseAppService {
	constructor(protected http: HttpClient) {
		super(http);
		this.serviceUri = `${environment.coreServiceApiUrlV2}/Customer`;
	}

	getCustomerProfile() {
		return this.http.get(`${this.serviceUri}/Profile`, { headers: this.getHttpRequestHeader() });
	}
}