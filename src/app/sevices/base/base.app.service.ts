import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { IAppService } from '../../models/master.model';
import { BaseHttpService } from './base.http.service';

export abstract class BaseAppService extends BaseHttpService implements IAppService {
  protected stateSubject: BehaviorSubject<string>;
  currentState$: Observable<string>;

  protected loaderSubject: BehaviorSubject<Boolean>;
  loader$: Observable<Boolean>;

  protected dataSubject: BehaviorSubject<Object>;
  dataState$: Observable<Object>;

  constructor(_httpClient: HttpClient) {
    super(_httpClient);

    // loader: boolean ( True => Loader show; False => Loader hide )
    this.loaderSubject = new BehaviorSubject<Boolean>(false);
    this.loader$ = this.loaderSubject.asObservable();

    // State: string ( create; update; delete; )
    this.stateSubject = new BehaviorSubject<string>('');
    this.currentState$ = this.stateSubject.asObservable();

    // Data : Object
    this.dataSubject = new BehaviorSubject<Object>('');
    this.dataState$ = this.dataSubject.asObservable();
  }

  setLoader(loader: Boolean): void {
    this.loaderSubject.next(loader);
  }

  setState(state: string): void {
    this.stateSubject.next(state);
  }

  setData(data: object) {
    this.dataSubject.next(data);
  }
}