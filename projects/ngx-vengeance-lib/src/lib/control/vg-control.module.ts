import { FactoryProvider, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgAutoInputComponent } from './auto-input/vg-auto-input.component';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { VgErrorSectionComponent } from './error-section/vg-error-section.component';
import { VgErrorMessagePipe } from './error-section/vg-error-message.pipe';
import { VgErrorDictService } from './error-section/vg-error-dict.service';
import { VgDelayInputDirective } from './vg-delay-input.directive';
import { VgFileInputComponent } from './file-input/vg-file-input.component';
import { VgFileIconPipe } from './file-input/vg-file-icon.pipe';

export interface VgErrorDictServiceProvider extends FactoryProvider {
  provide: typeof VgErrorDictService;
  useFactory: (translateService: never) => VgErrorDictService;
  // eslint-disable-next-line
  deps: [any];
}

@NgModule({
  declarations: [
    VgAutoInputComponent,
    VgErrorSectionComponent,
    VgErrorMessagePipe,
    VgDelayInputDirective,
    VgFileInputComponent,
    VgFileIconPipe,
  ],
  imports: [CommonModule, NgbTooltipModule, NgbAlertModule],
  exports: [
    VgAutoInputComponent,
    VgFileInputComponent,
    VgErrorSectionComponent,
    VgErrorMessagePipe,
    VgDelayInputDirective,
  ],
  providers: [VgErrorDictService],
})
export class VgControlModule {
  public static forRoot(
    loader: VgErrorDictServiceProvider
  ): ModuleWithProviders<VgControlModule> {
    return {
      ngModule: VgControlModule,
      providers: [loader],
    };
  }
}
