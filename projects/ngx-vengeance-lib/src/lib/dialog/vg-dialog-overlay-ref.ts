import {OverlayRef} from '@angular/cdk/overlay';
import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const DIALOG_REF = new InjectionToken<any>('DIALOG_REF');

export class VgDialogOverlayRef {

  public componentRef: any;

  constructor(readonly overlay: OverlayRef) { }

  close(): void {
    this.overlay.dispose();
  }

  onClose(): Observable<void> {
    return this.overlay.detachments();
  }

  isVisible(): HTMLElement {
    return (this.overlay && this.overlay.overlayElement);
  }

  getPosition(): DOMRect {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
