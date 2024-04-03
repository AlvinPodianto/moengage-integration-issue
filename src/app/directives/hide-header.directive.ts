import { Directive, Host, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {

  @Input('appHideHeader') toolbar:any; 
  constructor(private renderer: Renderer2, private domCtrl: DomController) { }

  ngOnInit() {   
    this.toolbar = this.toolbar.el; 
  }


    @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
      if ($event.detail.scrollTop > 0) {
          this.domCtrl.write(() => { 
              this.toolbar.style.setProperty('--background',  `#fff`); 
              this.toolbar.style.setProperty('box-shadow',  `0px 0px 4px rgba(51, 53, 55, 0.16)`); 
              
          });
      } else {
          this.domCtrl.write(() => { 
              this.toolbar.style.setProperty('--background',  `linear-gradient(180deg, rgba(91, 92, 95, 0.2) 0%, rgba(91, 92, 95, 0) 100%)`); 
              this.toolbar.style.setProperty('box-shadow',  `none`); 
          });
      } 
  }
}
