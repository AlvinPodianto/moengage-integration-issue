import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
//tvlk import { isPartner } from 'src/app/helpers/helper';

@Injectable({
  providedIn: 'root'
})

export abstract class BaseHttpService {
  public serviceUri: string;
  //tvlk isPartner:boolean=isPartner();

  constructor(protected http: HttpClient) { }

  getHttpRequestHeader(): HttpHeaders {
    if (localStorage.getItem('token') != null)
      return this.getRequestHeaderWithToken();
    else
      return this.getRequestHeaderWithoutToken();
  }

  private getRequestHeaderWithToken(): HttpHeaders {
    let header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'platform': localStorage.getItem('platform') ?? 'web',
      'device-os': localStorage.getItem('device-os'),
      'device-id': localStorage.getItem('device-id'),
      'app-version': environment.version
    }
    if (sessionStorage.getItem('partnerToken') != undefined)
      header = Object.assign(header, { 'token': sessionStorage.getItem('partnerToken') })
    return new HttpHeaders(header);
  }

  private getRequestHeaderWithoutToken(): HttpHeaders {
    let header = {
      'Content-Type': 'application/json',
      'platform': localStorage.getItem('platform') ?? 'web',
      'device-os': localStorage.getItem('device-os'),
      'device-id': localStorage.getItem('device-id'),
      'app-version': environment.version
    }

    //tvlk if (this.isPartner)
    //tvlk   header = Object.assign(header, { 'token': sessionStorage.getItem('partnerToken') });

    return new HttpHeaders(header);
  }

  getMultiPartAuthHttpRequestHeader(): HttpHeaders {
    let header = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'platform': localStorage.getItem('platform') ?? 'web',
      'device-os': localStorage.getItem('device-os'),
      'device-id': localStorage.getItem('device-id'),
      'app-version': environment.version
    }

    //tvlk if (this.isPartner)
    //tvlk   header = Object.assign(header, { 'token': sessionStorage.getItem('partnerToken') });

    return new HttpHeaders(header);
  }

  fetchJSONtoUrl(query: Object): string {
    let url: string = "";

    for (const element in query) {
      if (Array.isArray(query[element])) //is array
      {
        for (const subelement in query[element]) {
          if (query[element][subelement] && query[element][subelement].toString() !== '' && query[element] !== 0) {
            url = `${url}${element}=${encodeURIComponent(query[element][subelement])}&`;
          }
        }
      }
      else // is no array
      {
        if (query[element] != null && query[element].toString() !== '' && query[element] !== 0) {
          url = `${url}${element}=${encodeURIComponent(query[element])}&`;
        }
      }
    };

    return url;
  }
}