import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { FixedHeaderDirective } from './fixed-header.directive'; 
import { PreventKeyseDirective } from './prevent-keys.directive';
import { TrimDirective } from './remove-whitespace.directive';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';



@NgModule({
  declarations: [HideHeaderDirective, FixedHeaderDirective, PreventKeyseDirective, TrimDirective, ScrollToBottomDirective],
  imports: [
    CommonModule
  ],
  exports: [HideHeaderDirective, FixedHeaderDirective, PreventKeyseDirective, TrimDirective, ScrollToBottomDirective]
})
export class SharedDirectivesModule { }
