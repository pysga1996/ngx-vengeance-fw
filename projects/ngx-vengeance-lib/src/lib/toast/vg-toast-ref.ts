import { OverlayRef } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { VgToastData } from './vg-toast-data';

export const TOAST_REF = new InjectionToken<VgToastData>('TOAST_REF');

export class VgToastRef {
    constructor(readonly overlay: OverlayRef) { }

    close(): void {
        this.overlay.dispose();
    }

    isVisible(): HTMLElement {
        return (this.overlay && this.overlay.overlayElement);
    }

    getPosition(): DOMRect {
        return this.overlay.overlayElement.getBoundingClientRect();
    }
}
