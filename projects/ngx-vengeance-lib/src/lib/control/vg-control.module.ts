import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VgAutoInputComponent} from "./auto-input/vg-auto-input.component";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    VgAutoInputComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
  ],
  exports: [
    VgAutoInputComponent
  ]
})
export class VgControlModule {
}
