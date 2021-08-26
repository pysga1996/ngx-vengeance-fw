import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgNumberOnlyDirective } from './vg-number-only.directive';
import { VgCurrencyInputDirective } from './vg-currency-input.directive';
import { VgFocusFirstInvalidDirective } from './vg-focus-first-invalid.directive';
import { VgDelayClickDirective } from './vg-delay-click.directive';

@NgModule({
  declarations: [
    VgNumberOnlyDirective,
    VgCurrencyInputDirective,
    VgFocusFirstInvalidDirective,
    VgDelayClickDirective,
  ],
  exports: [
    VgNumberOnlyDirective,
    VgCurrencyInputDirective,
    VgFocusFirstInvalidDirective,
    VgDelayClickDirective,
  ],
  imports: [CommonModule],
})
export class VgDirectivesModule {}
