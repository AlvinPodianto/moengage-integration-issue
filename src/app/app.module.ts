import { APP_INITIALIZER, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DefaultUrlSerializer, PRIMARY_OUTLET, RouteReuseStrategy, UrlSerializer, UrlTree } from '@angular/router';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker'; 

import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DeviceDetectorService } from 'ngx-device-detector'; 
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx'; 

import { AppRoutingModule } from './app-routing.module';
import { SharedComponentModule } from './components/shared-component.module';

import { AppComponent } from './app.component';
import { TabLayoutComponent } from './layouts/tab-layout/tab-layout.component';
import { PrintLayoutComponent } from './layouts/print-layout/print-layout.component'; 

import { environment } from '../environments/environment';   

import { AuthService, CheckVersionService, DeviceService, LogService, RefreshTokenInterceptor } from './sevices';

import localeFr from '@angular/common/locales/id'; 

registerLocaleData(localeFr, 'id');

export function initializeConfig(authService: AuthService) {
  const x = (): Promise<any> => {
    return authService.initSession();
  };

  return x;
}

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    var treeRoute = super.parse(url);
    var route = treeRoute.root.children[PRIMARY_OUTLET]

    if (route != undefined)
      route.segments.map(element => element.path = element.path.toLowerCase());

    return treeRoute;
  }
}

@NgModule({
  declarations: [ AppComponent, TabLayoutComponent, PrintLayoutComponent ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({ mode: 'md' }),
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    SharedComponentModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js'),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CheckVersionService,
    DeviceDetectorService,
    DeviceService,
    LogService, 
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    },
    {
      provide: FileOpener
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [AuthService],
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: environment.production }),
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }