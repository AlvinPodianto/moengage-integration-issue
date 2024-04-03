import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';
import { DomController, IonContent } from '@ionic/angular';
import { isGoogleBotAgent } from '../helpers/helper';

@Directive({
  selector: '[scrollToBottom]'
})

export class ScrollToBottomDirective implements AfterViewInit {
  @Input('scrollToBottom') element: IonContent;
  constructor(private domCtrl: DomController) {
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    if (this.element && isGoogleBotAgent()) {
      this.element?.scrollToBottom();
    }
  }
  // @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
  //   if (this.element && isGoogleBotAgent()) {
  //     this.element?.scrollToBottom();
  //   }
  // }
}