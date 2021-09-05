import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbAlertModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { VgUploadProgressComponent } from './upload-progress/vg-upload-progress.component';
import { VgHerokuWakeupComponent } from './heroku-wakeup/vg-heroku-wakeup.component';

@NgModule({
  declarations: [VgUploadProgressComponent, VgHerokuWakeupComponent],
  imports: [CommonModule, NgbAlertModule, NgbProgressbarModule],
  exports: [VgUploadProgressComponent, VgHerokuWakeupComponent],
})
export class VgUtilModule {}
