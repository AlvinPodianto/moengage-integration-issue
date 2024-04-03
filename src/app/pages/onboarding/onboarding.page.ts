import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { isMobileDevice } from 'src/app/helpers/helper';
import { NavigationService } from 'src/app/sevices';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})

export class OnboardingPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  achievementList: any[] = [];
  currentSlideIndex: number = 1;
  products: any[] = [];
  slideOptsOne: any = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
  };

  isShowNavigation: boolean = false;
  viewEntered: boolean = false;
  isMobileDevice = isMobileDevice;
  deviceModel: any = '';

  constructor(
    protected navigationService: NavigationService) {
  }

  ngOnInit() {
    this.viewEntered = true;
    this.deviceModel = parseFloat(localStorage.getItem('model-number'));
  }

  ionViewDidEnter() {
    this.viewEntered = true;
    // this.slides.lockSwipes(true);
  }
  showNavHandler() {
    if (!this.isMobileDevice())
      this.isShowNavigation = true;
  }

  hideNavHandler = () => this.isShowNavigation = false;

  // Method called when slide is changed by drag or navigation
  slideDidChangeHandler() {
    this.slides.getActiveIndex().then(
      (index) => {
        this.currentSlideIndex = index + 1;
      });
  }

  onSliderNext() {
    // this.slides.lockSwipes(false);
    this.slides.slideNext();
    // this.slides.lockSwipes(true); 
  }

  @HostListener("click", ['$event'])
  onClick(event: MouseEvent) {
    // Prevent page from reloading
    event.preventDefault();
  }

  finishAppOnboarding() {
    localStorage.setItem('onboarding', 'true');
    this.navigationService.home();
  }
}
