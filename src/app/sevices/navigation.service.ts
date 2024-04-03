import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { EXCLUSION_PATH_REGEX, INavigationData } from "../models/navigation.model";

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  private _navigation: INavigationData[] = [];
  private _navigationSubject: Subject<any> = new Subject();

  constructor(private _router: Router) {
    this._navigationSubject.asObservable().subscribe(data => this._navigation = data);

    if (this._navigation.length == 0)
      this._navigation.push({ timestamp: new Date().getTime(), location: '/' });
  }

  record() {
    var currentUrl = window.location.href.replace(window.location.origin, '');
    var lastUrl = this._navigation[this._navigation.length - 1];

    if (currentUrl.indexOf('return-act') != -1)
      currentUrl = currentUrl.slice(0, currentUrl.indexOf('return-act') - 1);

    if (currentUrl.indexOf('timeframe') != -1)
      currentUrl = currentUrl.slice(0, currentUrl.indexOf('timeframe') -1);

    if (lastUrl?.location != currentUrl)
      this._navigation.push({ timestamp: new Date().getTime(), location: currentUrl });

    this._navigationSubject.next(this._navigation);
  }

  back(step: number = 0, ignoreParam: boolean = false) {
    if (step != 0)
      step = this._navigation.length < step ? 0 : step;

    var currentPath = window.location.pathname;

    if (ignoreParam) {
      var routeWithParam = this._navigation.filter(route => route.location.startsWith(currentPath) && route.location != currentPath);
      step = step + routeWithParam.length;
    }

    var previousUrl = this._navigation.slice(-2 - step).shift()?.location ?? '';
    var regex = new RegExp(EXCLUSION_PATH_REGEX.join('|'), "i");

    if (regex.test(previousUrl)) {
      this._navigation = [];
      this._navigationSubject.next(this._navigation);

      setTimeout(() => this.home(), 10);
    }
    else {
      this._navigation.splice(-2 - step, 2 + step);
      this._navigationSubject.next(this._navigation);
    }

    this._router.navigateByUrl(previousUrl);
  }

  reset(withRedirection: boolean = true, redirectionUrl: string = '') {
    this._navigation = [];
    this._navigation.push({ timestamp: new Date().getTime(), location: '/' });
    this._navigationSubject.next(this._navigation);

    if (withRedirection)
      setTimeout(() => this._router.navigateByUrl(redirectionUrl), 10);
  }

  home() {
    this._router.navigateByUrl("");
  }

  search() {
    this._router.navigateByUrl('/search');
  }

  cart() {
    this._router.navigateByUrl("/cart-page");
  }

  notification() {
    this._router.navigateByUrl("/notifications");
  }

  navigate(url: string = '/') {
    this._router.navigateByUrl(url);
  }

  getLastUrl() {
    return this._navigation[this._navigation.length - 2];
  }
}
