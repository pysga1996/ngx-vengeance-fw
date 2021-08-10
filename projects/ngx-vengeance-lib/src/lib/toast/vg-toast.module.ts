import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VgToastComponent} from './vg-toast.component';
import {VgToastService} from "./vg-toast.service";
import {defaultToastConfig, TOAST_CONF} from "./vg-toast.config";
import {OverlayModule} from "@angular/cdk/overlay";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [VgToastComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    OverlayModule
  ],
  exports: [VgToastComponent],
  providers: [VgToastService,
    {
      provide: TOAST_CONF,
      useValue: defaultToastConfig,
    }
  ]
})
export class VgToastModule {
  // public static forRoot(config = defaultToastConfig): ModuleWithProviders<VgToastModule> {
  //   return {
  //     ngModule: VgToastModule,
  //     providers: [
  //       {
  //         provide: TOAST_CONF,
  //         useValue: {...defaultToastConfig, ...config},
  //       },
  //     ],
  //   };
  // }
}

