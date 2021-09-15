import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgNumberOnlyDirective } from './vg-number-only.directive';
import { VgCurrencyInputDirective } from './vg-currency-input.directive';
import { VgFocusFirstInvalidDirective } from './vg-focus-first-invalid.directive';
import { VgDelayClickDirective } from './vg-delay-click.directive';
import { VgSwappableElementDirective } from './vg-swappable-element.directive';
import { VgSwappableListDirective } from './vg-swappable-list.directive';

@NgModule({
  declarations: [
    VgNumberOnlyDirective,
    VgCurrencyInputDirective,
    VgFocusFirstInvalidDirective,
    VgDelayClickDirective,
    VgSwappableListDirective,
    VgSwappableElementDirective,
  ],
  exports: [
    VgNumberOnlyDirective,
    VgCurrencyInputDirective,
    VgFocusFirstInvalidDirective,
    VgDelayClickDirective,
    VgSwappableListDirective,
  ],
  imports: [CommonModule],
})
export class VgDirectivesModule {}
