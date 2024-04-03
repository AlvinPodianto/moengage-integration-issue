import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';

import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { AppUpdate } from '@capawesome/capacitor-app-update';
import { PushNotifications, ActionPerformed, Token } from "@capacitor/push-notifications";
import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppTrackingTransparency, AppTrackingStatusResponse } from 'capacitor-plugin-app-tracking-transparency';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FCM } from "@capacitor-community/fcm";
import { MoECapacitorCore } from 'capacitor-moengage-core'

import { Guid } from './helpers/helper';
import { environment } from 'src/environments/environment';

import { LogData } from './models/log.model';

import { AuthService } from './sevices/auth.service';
import { DeviceService } from './sevices/device.service';
import { ActiveRouteService } from './sevices/active-route.service';
import { LogService } from './sevices/log.service';
import { NavigationService } from './sevices/navigation.service';
import { NotificationService } from './sevices';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  isAbleToUpdate: boolean = false;
  logData: LogData = new LogData();
  deviceInfo: any;

  constructor(private zone: NgZone,
    private logService: LogService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private authService: AuthService,
    private deviceService: DeviceService,
    private router: Router,
    private location: Location,
    protected activeRouteService: ActiveRouteService,
    protected deviceDetectorService: DeviceDetectorService,
    private notificationService: NotificationService,
    private swPush: SwPush,
    navigationService: NavigationService) {
    var seconds: number = 0;

    router.events.subscribe((event: Event) => {
      if (localStorage.getItem('fs')) {
        var cDate = new Date();
        var cfsDate = new Date(JSON.parse(localStorage.getItem('fs')).timeStamp)
        cfsDate = new Date(cfsDate.setMinutes(cfsDate.getMinutes() + 10));

        if (cDate >= cfsDate)
          localStorage.removeItem('fs')
      }
      
      switch (true) {
        case event instanceof NavigationStart: {
          seconds = new Date().getTime();
          break;
        }

        case event instanceof NavigationEnd: {
          navigationService.record();
          break;
        }

        case event instanceof NavigationError: {
          break;
        }

        default: {
          break;
        }
      }
    });

    this.initializeApp();
  }

  ngOnInit() {
    this.authService.initTokenRefresher();
    MoECapacitorCore.initialize({ appId: "FANKG5I56CANQB3AY4Y1HN1Q" });
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('capacitor'))
        this.redirectToOnboard();
    });

    // Check if platform is Mobile
    if (this.platform.is('capacitor')) {
      var deviceId = await Device.getId();
      var deviceInfo = await Device.getInfo();

      localStorage.setItem("platform", `${deviceInfo?.operatingSystem}`);
      localStorage.setItem("device-id", `${deviceId?.identifier}`);
      localStorage.setItem("device-os", `${deviceInfo.manufacturer} ${deviceInfo.model}, ${deviceInfo.operatingSystem} ${deviceInfo?.osVersion}`);
      localStorage.setItem("device-model", deviceInfo?.model);

      if (deviceInfo?.operatingSystem == 'ios') {
        var modelNumber = deviceInfo?.model.replace('iPhone', '').replace('iPad', '').replace('iPod', '').replace(',', '').trim();
        localStorage.setItem("model-number", modelNumber);
      }
      else {
        localStorage.setItem("model-number", deviceInfo?.model);
      }

      if (deviceInfo.isVirtual && environment.production)
        App.exitApp();

      // Hardware Back Button
      this.platform.backButton.subscribeWithPriority(10, () => {
        if (this.location.path() == '' || this.location.path() == '/home') {
          App.exitApp();
        }
        else if (this.location.path() == '/login' || this.location.path() == '/account' || this.location.path() == '/consultation' || this.location.path() == '/recipes') {
          this.router.navigateByUrl('');
        }
        else {
          var backButtons = document.getElementsByClassName('backButton');
          var element = backButtons.length > 1 ? backButtons.length - 1 : 0;

          if (backButtons.length != 0)
            (backButtons[element] as HTMLElement).click();
        }
      });

      // DeepLink
      App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        this.zone.run(() => {
          var slug = event.url.split(".com").pop();

          if (this.platform.is('ios') && event.url.includes('farmaku://'))
            slug = event.url.split("farmaku://").pop();
          else if (this.platform.is('android') && event.url.includes('app://farmaku'))
            slug = event.url.split("app://farmaku").pop();

          if (slug) {
            if (!slug.includes('artikel'))
              this.router.navigateByUrl(slug);
          }
          else
            this.router.navigateByUrl("/home");
        });
      });

      // Notification Token
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();

          if (this.platform.is('android'))
            MoECapacitorCore.setupNotificationChannelsAndroid();
          else if (this.platform.is('ios'))
            MoECapacitorCore.registerForPush();
        } 
        else {
          // Show some error or something
        }
      });

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: Token) => {
          // Jika user sudah login, maka simpan token ke database / backend
          localStorage.setItem('fcmToken', token.value);

          MoECapacitorCore.passFcmPushToken({ token: token.value, appId: "FANKG5I56CANQB3AY4Y1HN1Q" });
        }
      );

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => { }
      );

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (action: ActionPerformed) => {
          setTimeout(() => {
            if (action.notification.data?.EntityName.indexOf("LIVECHAT") != -1)
              this.router.navigateByUrl(`${action.notification.data?.RedirectionPath}?timeframe=${new Date().getTime()}`);
            else
              this.router.navigateByUrl(`${action.notification.data?.RedirectionPath}`);
          }, 300);
        }
      );

      if (this.platform.is('ios'))
        this.getStatusTracking();
    }
    else {
      var deviceOs = localStorage.getItem('device-os');

      if (deviceOs == undefined)
        localStorage.setItem("device-os", `${this.deviceDetectorService?.os}, ${this.deviceDetectorService?.os_version}`);

      var deviceUniqueId = localStorage.getItem('device-id');

      if (deviceUniqueId == undefined)
        localStorage.setItem("device-id", Guid.newGuid());

      // Request Notification in Web Platform
      this.notificationService.requestPermission();
    }
  }

  public async getStatusTracking(): Promise<AppTrackingStatusResponse> {
    const response = await AppTrackingTransparency.getStatus();

    console.log(response);
    // { status: 'authorized' } for example
    // if(response.status != 'authorized')
    // {
    // }

    this.requestPermissionTracking();

    return response;
  }

  public async requestPermissionTracking(): Promise<AppTrackingStatusResponse> {
    const response = await AppTrackingTransparency.requestPermission();

    console.log(response);
    // { status: 'authorized' } for example

    return response;
  }

  async redirectToOnboard() {
    let x = await localStorage.getItem('onboarding');

    if (x !== 'true') {
      this.router.navigate(['/onboarding']);
    }
  }
}