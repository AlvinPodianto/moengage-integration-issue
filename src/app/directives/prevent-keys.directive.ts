import { Directive, Input } from "@angular/core";

@Directive( {
  selector : '[prevent-keys]',
  host : {
      '(keydown)' : 'onKeyUp($event)'
  }
} )
export class PreventKeyseDirective {
  @Input( 'prevent-keys' ) preventKeys;
  onKeyUp ( $event ) {  
      var keyCode = $event.keyCode || $event.which;
      if (keyCode == 0 || keyCode == 229) { 
          keyCode = $event.target.value.charAt($event.target.selectionStart - 1).charCodeAt();             
      }
      if ( this.preventKeys && this.preventKeys.includes(keyCode) ) { 
          $event.preventDefault();
      }
  }
}