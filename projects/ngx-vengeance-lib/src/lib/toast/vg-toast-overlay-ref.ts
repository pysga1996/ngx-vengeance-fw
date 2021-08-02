import {GlobalPositionStrategy, OverlayRef} from '@angular/cdk/overlay';

export class VgToastOverlayRef {

  toastOverlayRefBefore!: VgToastOverlayRef | null;

  constructor(readonly overlayRef: OverlayRef) {
  }

  close(): void {
    this.overlayRef.dispose();
  }

  pushToastBeforeToLowerPosition(): void {
    if (this.toastOverlayRefBefore) {
      if (!this.toastOverlayRefBefore.isVisible()) {
        this.toastOverlayRefBefore = null;
        return;
      }
      const toastBeforePositionStrategy = this.toastOverlayRefBefore.overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
      const currentPosition = this.toastOverlayRefBefore.getPosition();
      toastBeforePositionStrategy.top(currentPosition.top + currentPosition.height + 20 + 'px');
      this.toastOverlayRefBefore.overlayRef.updatePositionStrategy(toastBeforePositionStrategy);
      this.toastOverlayRefBefore.overlayRef.updatePosition();
      this.toastOverlayRefBefore.pushToastBeforeToLowerPosition();
    }
  }

  isVisible(): HTMLElement {
    return (this.overlayRef && this.overlayRef?.overlayElement);
  }

  getPosition(): DOMRect {
    return this.overlayRef?.overlayElement?.getBoundingClientRect();
  }
}
