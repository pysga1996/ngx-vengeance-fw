import {Inject, Injectable, Injector} from '@angular/core';
import {Overlay, PositionStrategy} from '@angular/cdk/overlay';
import {VgToastData} from './vg-toast-data';
import {ComponentPortal} from '@angular/cdk/portal';
import {VgToastOverlayRef} from './vg-toast-overlay-ref';
import {VgToastComponent} from './vg-toast.component';
import {VgToastConfig} from './vg-toast.config';
import {RUNTIME_TOAST_CONF, TOAST_CONF, TOAST_DATA, TOAST_OVERLAY_REF} from "./vg-toast.config";

@Injectable()
export class VgToastService {
  private lastToast!: VgToastOverlayRef;

  constructor(private overlay: Overlay, private parentInjector: Injector,
              @Inject(TOAST_CONF) private toastConfig: VgToastConfig) {
  }

  show(data: VgToastData, runtimeConfig: VgToastConfig = {duration: 3000}): VgToastOverlayRef {
    const config: VgToastConfig = {...this.toastConfig, ...runtimeConfig};
    const positionStrategy = this.getPositionStrategy(config);
    const overlayRef = this.overlay.create({
      positionStrategy,
      // height: config.size.height,
      // width: config.size.width
    });
    const tmpToastOverlayRef = this.lastToast;
    const toastRef = new VgToastOverlayRef(overlayRef);
    this.lastToast = toastRef;
    this.lastToast.toastOverlayRefBefore = tmpToastOverlayRef;

    const injector = this.getInjector(data, toastRef, this.parentInjector, runtimeConfig);
    const toastPortal = new ComponentPortal(VgToastComponent, null, injector);

    const comp = overlayRef.attach(toastPortal);
    this.lastToast.pushToastBeforeToLowerPosition();
    return this.lastToast;
  }

  getInjector(data: VgToastData, toastRef: VgToastOverlayRef, parentInjector: Injector, runtimeConfig?: VgToastConfig): Injector {
    return Injector.create({
      providers: [
        {provide: TOAST_DATA, useValue: data},
        {provide: TOAST_OVERLAY_REF, useValue: toastRef},
        {provide: RUNTIME_TOAST_CONF, useValue: runtimeConfig}
      ],
      parent: parentInjector
    });
  }

  getPositionStrategy(config: VgToastConfig = {duration: 3000}): PositionStrategy {
    const positionStrategy = this.overlay.position().global();
    if (config.position.top) {
      positionStrategy.top(config.position.top);
    }
    if (config.position.right) {
      positionStrategy.right(config.position.right);
    }
    if (config.position.bottom) {
      positionStrategy.bottom(config.position.bottom);
    }
    if (config.position.left) {
      positionStrategy.left(config.position.left);
    }
    if (config.position.horizontalAlignment) {
      positionStrategy.centerHorizontally();
    }
    if (config.position.verticalAlignment) {
      positionStrategy.centerVertically();
    }
    return positionStrategy;
  }

  // calculateTopPosition(config: VgToastConfig): string {
  //   // const topPosition = config.position.top;
  //   // const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
  //   // const position = lastToastIsVisible
  //   //   ? this.lastToast.getPosition().bottom + 20
  //   //   : topPosition;
  //   // if (typeof position === 'number') {
  //   //   return position + 'px';
  //   // } else {
  //   //   return position;
  //   // }
  //   return '2rem';
  // }
}
