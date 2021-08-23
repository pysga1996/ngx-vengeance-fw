import {FactoryProvider, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VgAutoInputComponent} from "./auto-input/vg-auto-input.component";
import {NgbAlertModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {VgErrorSectionComponent} from './error-section/vg-error-section.component';
import {VgErrorMessagePipe} from "./error-section/vg-error-message.pipe";
import {VgErrorDictService} from "./error-section/vg-error-dict.service";

export interface VgErrorDictServiceProvider extends FactoryProvider {
  provide: typeof VgErrorDictService,
  useFactory: (translateService: any) => VgErrorDictService,
  deps: [any]
}

// export function ConfigFactory(service: VgErrorDictService) {
//   // return () => config.load();
//   return () => service.registerTranslateService()
// }

@NgModule({
  declarations: [
    VgAutoInputComponent,
    VgErrorSectionComponent,
    VgErrorMessagePipe
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbAlertModule,
  ],
  exports: [
    VgAutoInputComponent,
    VgErrorSectionComponent,
    VgErrorMessagePipe
  ],
  providers: [
    VgErrorDictService
  ]
})
export class VgControlModule {

  public static forRoot(loader: VgErrorDictServiceProvider): ModuleWithProviders<VgControlModule> {
    return {
      ngModule: VgControlModule,
      providers: [loader]
    }
  }
}
