import {Inject, Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {VgConfirmDialogComponent} from './confirm-dialog/vg-confirm-dialog.component';
import {VgMessageDialogComponent} from './message-dialog/vg-message-dialog.component';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {Overlay, PositionStrategy} from '@angular/cdk/overlay';
import {DIALOG_REF, VgDialogOverlayRef} from './vg-dialog-overlay-ref';
import {
  DIALOG_DATA,
  DIALOG_OPTIONS,
  VgDialogOptions,
  VgDialogData,
  DIALOG_SIZE
} from "./vg-dialog-config";

@Injectable()
export class VgDialogService {

  private lastDialogRef!: VgDialogOverlayRef;

  constructor(private parentInjector: Injector, private overlay: Overlay,
              @Inject(DIALOG_DATA) private dialogData: VgDialogData,
              @Inject(DIALOG_OPTIONS) private dialogOptions: VgDialogOptions) {
  }

  show(content: ComponentType<any>, dialogData?: VgDialogData, dialogOptions?: VgDialogOptions): VgDialogOverlayRef {
    const options = {...this.dialogOptions, ...dialogOptions};
    const positionStrategy = this.getPositionStrategy(options);
    const overlayRef = this.overlay.create({
        positionStrategy,
        panelClass: options.panelClass,
        backdropClass: options.backdropClass,
        hasBackdrop: options.hasBackdrop,
        width: options?.size?.width,
        height: options?.size?.height,
        disposeOnNavigation: options.disposeOnNavigation
      }
    );
    const dialogRef = new VgDialogOverlayRef(overlayRef);
    this.lastDialogRef = dialogRef;
    const data = {...this.dialogData, ...dialogData};
    const injector = this.getInjector(dialogRef, this.parentInjector, data);
    const dialogPortal = new ComponentPortal(content, null, injector);

    dialogRef.componentRef = overlayRef.attach(dialogPortal).instance;
    return dialogRef;
  }

  getInjector(dialogRef: VgDialogOverlayRef, parentInjector: Injector,
              dialogData?: VgDialogData, runtimeDialogOptions?: VgDialogOptions): Injector {
    const dialogOptions = {...this.dialogOptions, ...runtimeDialogOptions}
    return Injector.create({
      providers: [
        {provide: DIALOG_REF, useValue: dialogRef},
        {provide: DIALOG_DATA, useValue: dialogData},
        {provide: DIALOG_OPTIONS, useValue: dialogOptions}
      ],
      parent: parentInjector
    });
  }

  getPositionStrategy(dialogOptions?: VgDialogOptions): PositionStrategy {
    return this.overlay
    .position()
    .global()
    .top(dialogOptions?.top)
    .centerHorizontally();
  }

  public confirm(mainTitle: string = 'Dialog title', message: string = 'Dialog message', labelYes: string = 'Yes',
                 labelNo: string = 'No', className?: string): Observable<boolean> {
    const initialState: VgDialogData = {
      title: mainTitle,
      message,
      buttons: {
        confirm: {
          label: labelYes,
          className: ''
        },
        cancel: {
          label: labelNo,
          className: ''
        }
      },
      iconClass: 'text-warning fa fa-question-circle',
    };
    this.playSound('notify');
    this.lastDialogRef = this.show(VgConfirmDialogComponent,
      initialState,
      {
        backdropClass: className,
        hasBackdrop: true,
        size: DIALOG_SIZE.SMALL_DIALOG
        // keyboard: false,
      });
    return (this.lastDialogRef.componentRef as VgConfirmDialogComponent).onClose as Observable<boolean>;
  }

  public playSound(sound: string, path = 'assets/media/sound'): void {
    const audioElement = document.createElement('audio');
    if (navigator.userAgent.match('Firefox/')) {
      audioElement.setAttribute('src', path + '/' + sound + '.ogg');
    } else {
      audioElement.setAttribute('src', path + '/' + sound + '.mp3');
    }

    // audioElement.addEventListener('load', () => {
    //   audioElement.play().then(() => {
    //     console.log(`Play ${sound}`);
    //   });
    // }, true);
    // audioElement.pause();
    audioElement.play().then(() => {
      console.log(`Play ${sound}`);
    });
  }

  public showMessage(title: string = 'Dialog title', message: string = 'Dialog message',
                     iconClass?: string, className?: string, imageUrl?: string, sound: string = 'balloon'): Observable<boolean> {
    const initialState: VgDialogData = {
      title,
      message,
      buttons: {
        confirm: {
          label: 'OK',
          className: ''
        }
      },
      iconClass,
      imageUrl
    };
    this.playSound(sound);
    this.lastDialogRef = this.show(VgMessageDialogComponent,
      initialState,
      {
        // keyboard: false,
        panelClass: className,
        hasBackdrop: true,
        size: DIALOG_SIZE.SMALL_DIALOG
      });
    return (this.lastDialogRef.componentRef as VgMessageDialogComponent).onClose as Observable<boolean>;
  }

  public showInfoMessage(title?: string, message?: string, className?: string): Observable<boolean> {
    return this.showMessage(title, message, 'text-info bi bi-question-circle-fill',
      className, undefined, 'info-bar');
  }

  public showWarningMessage(title?: string, message?: string, className?: string): Observable<boolean> {
    return this.showMessage(title, message, 'text-warning bi bi-exclamation-triangle-fill',
      className, undefined, 'exclamation');
  }

  public showErrorMessage(title?: string, message?: string, className?: string): Observable<boolean> {
    return this.showMessage(title, message, 'text-danger bi bi-exclamation-circle-fill',
      className, undefined, 'critical-stop');
  }

  public showSuccessMessage(title?: string, message?: string, className?: string): Observable<boolean> {
    return this.showMessage(title, message, 'text-success bi bi-check-circle-fill',
      className, undefined, 'chimes');
  }
}


