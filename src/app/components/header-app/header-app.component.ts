import { AfterContentInit, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { isMobileDevice } from 'src/app/helpers/helper';
import { NavigationService } from 'src/app/sevices';

declare var window: any;

@Component({
  selector: 'header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.scss'],
})

export class HeaderAppComponent implements AfterContentInit {
  visible = false;

  constructor(protected navigationService: NavigationService, private platform: Platform) { }

  ngAfterContentInit() {
    if (!sessionStorage.getItem('cdap') && isMobileDevice() && !this.platform.is('capacitor'))
      this.visible = true;
  }

  destroy() {
    sessionStorage.setItem('cdap', '1')
    this.visible = false;
  }

  redirect() {
    var path = window.location.pathname;
    var appScheme = 'app://farmaku';
    var storeUrl = 'https://play.google.com/store/apps/details?id=com.farmaku.app&hl=en';

    if (this.platform.is('ios')) {
      appScheme = 'farmaku://';
      storeUrl = 'https://apps.apple.com/id/app/farmaku/id6449138635';
    }

    window.location = appScheme + path;

    setTimeout(() => {
      window.location = storeUrl;
    }, 750);
  }
}
