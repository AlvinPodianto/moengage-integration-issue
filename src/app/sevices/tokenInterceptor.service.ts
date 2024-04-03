import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, RouterStateSnapshot } from '@angular/router'; 
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { switchMap, catchError, finalize, take } from 'rxjs/operators' 
import { environment } from 'src/environments/environment'; 
import { JwtToken } from '../models/auth.model'; 
import { AuthService, LoadingService } from '../sevices';

@Injectable({
  providedIn: 'root'
})

export class RefreshTokenInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public authService: AuthService, private router: Router, private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    return next.handle(request).pipe(
      catchError(
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              return this.handle401Error(request, next);
            }
            else {
              return throwError(error);
            }
          }
        }
      )
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    const state: RouterStateSnapshot = this.router.routerState.snapshot;
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.refreshToken()
        .pipe(take(1))
        .pipe(
          switchMap(data => {
            const response = <JwtToken>data;
            this.tokenSubject.next(response.accessToken);

            localStorage.setItem('token', response.accessToken);

            let header = {
              'Content-Type': request.headers.get('Content-Type'),
              'Authorization': `Bearer ${this.tokenSubject.value}`,
              'platform': localStorage.getItem('platform') ?? 'web',
              'device-os': localStorage.getItem('device-os'),
              'device-id': localStorage.getItem('device-id'),
              'app-version': environment.version
            }
            if (sessionStorage.getItem('partnerToken') != undefined)
              header = Object.assign(header, { 'token': sessionStorage.getItem('partnerToken') });
            
            const httpHeaders = new HttpHeaders(header);

            return next.handle(request.clone({
              headers: httpHeaders
            }));
          }),
          catchError(error => {
            this.loadingService.dismiss();
            return <any>this.authService.logout(state);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );

    }
    else {
      this.isRefreshingToken = false;
      let header = {
        'Content-Type': request.headers.get('Content-Type'),
        'Authorization': `Bearer ${this.tokenSubject.value}`,
        'platform': localStorage.getItem('platform') ?? 'web',
        'device-os': localStorage.getItem('device-os'),
        'device-id': localStorage.getItem('device-id'),
        'app-version': environment.version
      }

      if (sessionStorage.getItem('partnerToken') != undefined)
        header = Object.assign(header, { 'token': sessionStorage.getItem('partnerToken') });

      const httpHeaders = new HttpHeaders(header);

      return next.handle(request.clone({
        headers: httpHeaders
      }));
    }
  }
}