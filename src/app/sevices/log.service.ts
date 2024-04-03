import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogData } from '../models/log.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BaseHttpService } from './base/base.http.service';
@Injectable({
  providedIn: 'root'
})
export class LogService extends BaseHttpService {
  defaultHeader: HttpHeaders; 
  constructor(protected httpCLient: HttpClient, private router: Router) { 
    super(httpCLient);
    this.serviceUri = `${environment.coreServiceApiUrlV2}/Logs`;
  }

  onSendLog(object:LogData): Observable<Object> { 
    object.pageName=this.router.url;
    if(object.responseCode == 200){
      if(object.actionValue.includes('assets')){
        object.actionValue=`${environment.appUrlWww}${object.actionValue}`;
      }else{
      object.actionValue=`${environment.coreServiceApiUrlV2}${object.actionValue}`;
      }
    }
    return this.http.post(`${this.serviceUri}/Journey`, JSON.stringify(object), { headers: this.getHttpRequestHeader() });
  }
}
