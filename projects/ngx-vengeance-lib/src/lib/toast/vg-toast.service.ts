import {Inject, Injectable, Injector} from '@angular/core';
import {Overlay, PositionStrategy} from '@angular/cdk/overlay';
import {TOAST_DATA, VgToastData} from './vg-toast-data';
import {ComponentPortal} from '@angular/cdk/portal';
import {TOAST_REF, VgToastRef} from './vg-toast-ref';
import {VgToastComponent} from './vg-toast.component';
import {RUNTIME_TOAST_CONF, TOAST_CONF, VgToastConfig} from './vg-toast.config';

@Injectable({
  providedIn: 'root'
})
export class VgToastService {
  private lastToast!: VgToastRef;

  constructor(private overlay: Overlay, private parentInjector: Injector,
              @Inject(TOAST_CONF) private toastConfig: VgToastConfig) {
  }

  show(data: VgToastData, runtimeConfig: VgToastConfig = {duration: 3000}): VgToastRef {
    const positionStrategy = this.getPositionStrategy(runtimeConfig);
    const overlayRef = this.overlay.create({positionStrategy});

    const toastRef = new VgToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector = this.getInjector(data, toastRef, this.parentInjector, runtimeConfig);
    const toastPortal = new ComponentPortal(VgToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  getInjector(data: VgToastData, toastRef: VgToastRef, parentInjector: Injector, runtimeConfig?: VgToastConfig): Injector {
    const tokens = new WeakMap();
    tokens.set(TOAST_DATA, data);
    tokens.set(TOAST_REF, toastRef);
    tokens.set(RUNTIME_TOAST_CONF, runtimeConfig);
    return Injector.create({
      providers: [
        {provide: TOAST_DATA, useValue: data},
        {provide: TOAST_REF, useValue: toastRef},
        {provide: RUNTIME_TOAST_CONF, useValue: runtimeConfig}
      ],
      parent: parentInjector
    });
  }

  getPositionStrategy(runtimeConfig: VgToastConfig = {duration: 3000}): PositionStrategy {
    const config = {...this.toastConfig, ...runtimeConfig};
    const positionStrategy = this.overlay.position().global();
    if (config.position.top) {
      // positionStrategy.top(config.position.top);
      positionStrategy.top(this.getPosition(runtimeConfig));
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

  // getPositionStrategy(runtimeConfig?: ToastConfig): any {
  //   return this.overlay.position()
  //   .global()
  //   .top(this.getPosition(runtimeConfig))
  //   .centerHorizontally();
  // }

  getPosition(config: VgToastConfig): string {
    const topPosition = config.position.top;
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
    const position = lastToastIsVisible
      ? this.lastToast.getPosition().bottom + 20
      : topPosition;
    if (typeof position === 'number') {
      return position + 'px';
    } else {
      return position;
    }
  }
}
