import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgNumberOnlyDirective } from './vg-number-only.directive';
import { VgCurrencyInputDirective } from './vg-currency-input.directive';
import { VgFocusFirstInvalidDirective } from './vg-focus-first-invalid.directive';

@NgModule({
  declarations: [
    VgNumberOnlyDirective,
    VgCurrencyInputDirective,
    VgFocusFirstInvalidDirective,
  ],
  exports: [
    VgNumberOnlyDirective,
    VgCurrencyInputDirective,
    VgFocusFirstInvalidDirective,
  ],
  imports: [CommonModule],
})
export class VgDirectivesModule {}
