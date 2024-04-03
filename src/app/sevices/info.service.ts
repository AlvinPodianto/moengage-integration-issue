import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { BaseHttpService } from './base/base.http.service';

@Injectable({
  providedIn: 'root'
})

export class InfoService extends BaseHttpService {

  constructor(protected httpCLient: HttpClient) {
    super(httpCLient);

    this.serviceUri = `${environment.coreServiceApiUrlV2}/Info`;
  }

  getContactInfo() {
    let url = `${this.serviceUri}/Contact`;

    return this.http.get(url, { headers: this.getHttpRequestHeader() });
  }

  getPharmacyInfo(id:number) {
    let url = `${this.serviceUri}/Pharmacy/${id}`;

    return this.http.get(url, { headers: this.getHttpRequestHeader() });
  }
}