import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TabItems } from 'src/app/models/tab-items';
import { Profile } from 'src/app/pages/account/account.model';
import { AuthService } from 'src/app/sevices';

@Component({
  selector: 'app-tab-layout',
  templateUrl: './tab-layout.component.html',
  styleUrls: ['./tab-layout.component.scss'],
})

export class TabLayoutComponent implements OnInit, DoCheck {
  tabContents: any[] = [];
  activeIndex: number = null;

  constructor(private platform: Platform, protected router: Router, public authService: AuthService) {
    this.authService.loader$.subscribe(
      (data) => {
        if (data) {
          setTimeout(() => {
            this.initActiveRoute();
          }, 300);
        }
      }
    );

    this.authService.currentState$.subscribe(
      (data) => {
        if (data === 'logIn') {
          this.initAuthTab();
          this.initActiveRoute();
        }
        else if (data === 'logOut') {
          this.initTab();
          this.initActiveRoute();
        }
      }
    );
  }

  ngOnInit() {
    this.checkHasTokenTab();

    this.initActiveRoute();
  }

  ngDoCheck() {
    this.initActiveRoute();
    this.checkHasTokenTab();
  }

  initTab() {
    if (!this.platform.is('capacitor'))
      this.tabContents = [
        TabItems.home,
        TabItems.recipe,
        TabItems.consult,
        TabItems.login
      ];
    else
      this.tabContents = [
        TabItems.home,
        TabItems.recipe,
        TabItems.consult,
        TabItems.login
      ];
  }

  initAuthTab() {
    if (!this.platform.is('capacitor'))
      this.tabContents = [
        TabItems.home,
        TabItems.recipe,
        TabItems.consult,
        TabItems.account
      ];
    else
      this.tabContents = [
        TabItems.home,
        TabItems.recipe,
        TabItems.consult,
        TabItems.account
      ];

    const profile = <Profile>JSON.parse(localStorage.getItem('profile'));

    if (profile)
      if (!profile.isAddressFilled || (!profile.isVerified))
        this.tabContents = this.tabContents.map(item => {
          if (item.title == 'Akun') {
            item.hasWarning = true;
          }
          return item;
        });
  }

  initActiveRoute() {
    let currentPath: string = this.router.url;
    currentPath = currentPath.split("/")[1];
    let n = 0;
    this.activeIndex = 0;

    this.tabContents.forEach(
      (item) => {
        if (item.url == currentPath)
          this.activeIndex = n;

        n++;
      }
    );

    if (!this.activeIndex)
      this.activeIndex = 0;
  }

  checkHasTokenTab() {
    let token = localStorage.getItem('token');

    if (token != null || token?.length > 0)
      this.initAuthTab();
    else
      this.initTab();
  }

  initBadge() {
    // Cart
    const cartBadge = JSON.parse(sessionStorage.getItem('nldc'))?.totalCart;
    this.tabContents.forEach(x => {
      if (x?.url == 'cart')
        x.badgeValue = cartBadge > 0 ? cartBadge.toString() : '';
    });
  }

  setActiveIndex(newIndex) {
    this.activeIndex = newIndex;
    //tvlk if(this.activeIndex == 2){
    //tvlk   this.menuTrack("consultation_modal")
    //tvlk }
  }

  //tvlk async menuTrack(event){
  //tvlk   this.travelokaService.onTrackInteraction({
  //tvlk     pageName: "LANDING",
  //tvlk     pageSectionName: "",
  //tvlk     eventCategory: event,
  //tvlk     eventName: "open",
  //tvlk     eventLabel: "",
  //tvlk     eventValue: null,
  //tvlk   });
  //tvlk }
}