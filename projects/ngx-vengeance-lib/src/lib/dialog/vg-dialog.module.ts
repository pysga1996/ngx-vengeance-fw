import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VgConfirmDialogComponent} from './confirm-dialog/vg-confirm-dialog.component';
import {VgMessageDialogComponent} from './message-dialog/vg-message-dialog.component';
import {VgDialogWrapperComponent} from "./dialog-wrapper/vg-dialog-wrapper.component";
import {VgDialogService} from "./vg-dialog.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OverlayModule} from "@angular/cdk/overlay";
import {
  DIALOG_DATA,
  DIALOG_OPTIONS,
  DIALOG_SIZE,
  DIALOG_TYPE,
  VgDialogData,
  VgDialogOptions
} from "./vg-dialog-config";


@NgModule({
  declarations: [VgDialogWrapperComponent, VgConfirmDialogComponent, VgMessageDialogComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    OverlayModule
  ],
  providers: [VgDialogService],
  exports: [VgDialogWrapperComponent, VgConfirmDialogComponent, VgMessageDialogComponent]
})
export class VgDialogModule {

  public static forRoot(dialogData?: VgDialogData, dialogOptions?: VgDialogOptions): ModuleWithProviders<VgDialogModule> {
    const defaultDialogOptions: VgDialogOptions = {
      hasBackdrop: true,
      size: DIALOG_SIZE.SMALL_DIALOG,
      top: '5rem',
      disposeOnNavigation: true,
      type: DIALOG_TYPE.NORMAL,
      animation: {
        fadeOut: 2500,
        fadeIn: 300,
      },
    };
    const defaultDialogData: VgDialogData = {
      title: 'Default dialog',
      message: 'Hello World!',
      buttons: {
        confirm: {
          label: 'Close',
          className: 'btn btn-primary'
        }
      }
    };
    return {
      ngModule: VgDialogModule,
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: { ...defaultDialogData, ...dialogData},
        },
        {
          provide: DIALOG_OPTIONS,
          useValue: { ...defaultDialogOptions, ...dialogOptions}
        }
      ],
    };
  }
}
