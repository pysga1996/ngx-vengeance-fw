import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbAlertModule, NgbProgressbarModule} from "@ng-bootstrap/ng-bootstrap";
import {VgUploadProgressComponent} from "./upload-progress/vg-upload-progress.component";


@NgModule({
  declarations: [VgUploadProgressComponent],
  imports: [
    CommonModule,
    NgbAlertModule,
    NgbProgressbarModule
  ],
  exports: [VgUploadProgressComponent]
})
export class VgUtilModule {
}
