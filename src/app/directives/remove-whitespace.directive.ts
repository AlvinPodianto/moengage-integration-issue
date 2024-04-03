import { Directive, OnInit, ElementRef, HostListener, Renderer2 } from '@angular/core'; 

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective implements OnInit {
  currencyChars = new RegExp('[\.,]', 'g'); // we're going to remove commas and dots

  constructor(public el: ElementRef, public renderer: Renderer2) {}

  ngOnInit() {
    this.format(this.el.nativeElement.value); // format any initial values
  }

  @HostListener('input', ["$event.target.value"]) onInput(e: string) {
    this.format(e);
  };

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  @HostListener('blur', ["$event.target.value"]) onBlur(e: string) {
    this.format(e);
  };

  format(val:string) { 
    if(val) {
      val = val.replace(/[\s]/g, '');
      this.renderer.setProperty(this.el.nativeElement, 'value', val);
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'value', null);
    }
  }
 
}