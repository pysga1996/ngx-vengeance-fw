import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VgNumberOnlyDirective} from './vg-number-only.directive';
import {VgCurrencyInputDirective} from './vg-currency-input.directive';

@NgModule({
  declarations: [VgNumberOnlyDirective, VgCurrencyInputDirective],
  exports: [
    VgNumberOnlyDirective,
    VgCurrencyInputDirective
  ],
  imports: [
    CommonModule
  ]
})
export class VgDirectivesModule {
}
