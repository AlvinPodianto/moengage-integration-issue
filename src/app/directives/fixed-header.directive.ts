import { Directive, Host, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appFixedHeader]'
})
export class FixedHeaderDirective {

  @Input('appFixedHeader') fixed:any; 
  constructor(private renderer: Renderer2, private domCtrl: DomController) { }

  ngOnInit() {   
    this.fixed = this.fixed.el; 
  }


    @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
      if ($event.detail.scrollTop > 100 ) {
          this.domCtrl.write(() => {  
              this.fixed.style.setProperty('--background',  `#fff`); 
              this.fixed.style.setProperty('box-shadow',  `0px 0px 4px rgba(51, 53, 55, 0.16)`); 
              this.fixed.querySelectorAll("ion-icon").forEach(element => {
                element.style.setProperty('color',  `var(--ion-color-secondary)`); 
              }); 
              if(this.fixed.querySelector(".cart-white"))
              this.fixed.querySelector(".cart-white").src = '../../../assets/icon/cart.svg';
              if(this.fixed.querySelector(".home-white"))
              this.fixed.querySelector(".home-white").src = '../../../assets/icon/home.png';
          });
      } else {
          this.domCtrl.write(() => { 
              this.fixed.style.setProperty('--background',  `linear-gradient(180deg, rgba(91, 92, 95, 0.2) 0%, rgba(91, 92, 95, 0) 100%)`); 
              this.fixed.style.setProperty('box-shadow',  `none`); 
              this.fixed.querySelectorAll("ion-icon").forEach(element => {
                element.style.setProperty('color',  `var(--ion-color-snow-white)`); 
              }); 
              if(this.fixed.querySelector(".cart-white"))
              this.fixed.querySelector(".cart-white").src = '../../../assets/icon/cart-white.svg';
              if(this.fixed.querySelector(".home-white"))
              this.fixed.querySelector(".home-white").src = '../../../assets/icon/home-white.png';
          });
      } 
  }
}