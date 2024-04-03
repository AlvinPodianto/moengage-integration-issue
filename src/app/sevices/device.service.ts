import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";

import { BaseAppService } from "src/app/sevices/base/base.app.service";

@Injectable()
export class DeviceService extends BaseAppService {

	constructor(protected http: HttpClient) {
		super(http);
		this.serviceUri = `${environment.coreServiceApiUrlV1}/Versions`;
	}
    
	checkIsUpdateAvaliable(deviceUniqueId: string, deviceOs: string) {
		let url = `${this.serviceUri}/check?deviceUniqueId=${deviceUniqueId}&osName=${deviceOs.toLowerCase()}&versionNumber=${environment.version}`;

		return this.http.get(url, { headers: this.getHttpRequestHeader() });
	}
}
