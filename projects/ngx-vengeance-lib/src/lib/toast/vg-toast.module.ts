import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgToastComponent } from './vg-toast.component';
import { VgToastService } from './vg-toast.service';
import {
  TOAST_CONF,
  TOAST_POSITION,
  TOAST_SIZE,
  TOAST_TYPE,
  VgToastConfig,
} from './vg-toast.config';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [VgToastComponent],
  imports: [CommonModule, BrowserAnimationsModule, OverlayModule],
  exports: [VgToastComponent],
  providers: [VgToastService],
})
export class VgToastModule {
  public static forRoot(
    config?: VgToastConfig
  ): ModuleWithProviders<VgToastModule> {
    const defaultToastConfig: VgToastConfig = {
      position: TOAST_POSITION.TOP_CENTER,
      size: TOAST_SIZE.SMALL_DIALOG,
      animation: {
        fadeOut: 2500,
        fadeIn: 300,
      },
      duration: 2000,
      type: TOAST_TYPE.NORMAL,
    };
    return {
      ngModule: VgToastModule,
      providers: [
        {
          provide: TOAST_CONF,
          useValue: { ...defaultToastConfig, ...config },
        },
      ],
    };
  }
}
