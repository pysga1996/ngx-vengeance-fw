import { Inject, Injectable, Injector } from '@angular/core';
import { Overlay, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { VgToastOverlayRef } from './vg-toast-overlay-ref';
import { VgToastComponent } from './vg-toast.component';
import {
  RUNTIME_TOAST_CONF,
  TOAST_CONF,
  TOAST_DATA,
  TOAST_OVERLAY_REF,
  TOAST_TYPE,
  VgToastConfig,
  VgToastData,
} from './vg-toast.config';
import { VgSoundUtil } from '../util/vg-sound.util';

@Injectable()
export class VgToastService {
  private lastToast!: VgToastOverlayRef;
  public readonly msgPool: Set<string> = new Set();
  initialToastSounds = [
    'default',
    'chord',
    'battery-critical',
    'error',
    'balloon',
  ];

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(TOAST_CONF) private toastConfig: VgToastConfig
  ) {
    VgSoundUtil.initSound(this.initialToastSounds, 'toastSound');
  }

  show(
    data: VgToastData,
    runtimeConfig: VgToastConfig = { duration: 3000 }
  ): VgToastOverlayRef | null {
    if (!data?.text || this.msgPool.has(data.text)) {
      return null;
    } else {
      this.msgPool.add(data.text);
    }
    const config: VgToastConfig = { ...this.toastConfig, ...runtimeConfig };
    VgSoundUtil.playSound(config.sound);
    const positionStrategy = this.getPositionStrategy(config);
    const overlayRef = this.overlay.create({
      positionStrategy,
      // height: config.size.height,
      // width: config.size.width
    });

    const tmpToastOverlayRef = this.lastToast;
    const toastRef = new VgToastOverlayRef(overlayRef, this, data.text);
    this.lastToast = toastRef;
    this.lastToast.toastOverlayRefBefore = tmpToastOverlayRef;

    const injector = this.getInjector(
      data,
      toastRef,
      this.parentInjector,
      runtimeConfig
    );
    const toastPortal = new ComponentPortal(VgToastComponent, null, injector);

    const comp = overlayRef.attach(toastPortal);
    console.debug('Toast component: ', comp);
    this.lastToast.pushToastBeforeToLowerPosition();
    return this.lastToast;
  }

  getInjector(
    data: VgToastData,
    toastRef: VgToastOverlayRef,
    parentInjector: Injector,
    runtimeConfig?: VgToastConfig
  ): Injector {
    return Injector.create({
      providers: [
        { provide: TOAST_DATA, useValue: data },
        { provide: TOAST_OVERLAY_REF, useValue: toastRef },
        { provide: RUNTIME_TOAST_CONF, useValue: runtimeConfig },
      ],
      parent: parentInjector,
    });
  }

  getPositionStrategy(
    config: VgToastConfig = { duration: 3000 }
  ): PositionStrategy {
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

  success(
    data: VgToastData,
    runtimeConfig: VgToastConfig = { duration: 3000 }
  ): void {
    this.show(data, {
      ...runtimeConfig,
      type: TOAST_TYPE.SUCCESS,
      sound: 'chord',
    });
  }

  error(
    data: VgToastData,
    runtimeConfig: VgToastConfig = { duration: 3000 }
  ): void {
    this.show(data, {
      ...runtimeConfig,
      type: TOAST_TYPE.ERROR,
      sound: 'battery-critical',
    });
  }

  warning(
    data: VgToastData,
    runtimeConfig: VgToastConfig = { duration: 3000 }
  ): void {
    this.show(data, {
      ...runtimeConfig,
      type: TOAST_TYPE.WARNING,
      sound: 'error',
    });
  }

  info(
    data: VgToastData,
    runtimeConfig: VgToastConfig = { duration: 3000 }
  ): void {
    this.show(data, {
      ...runtimeConfig,
      type: TOAST_TYPE.INFO,
      sound: 'balloon',
    });
  }
}
