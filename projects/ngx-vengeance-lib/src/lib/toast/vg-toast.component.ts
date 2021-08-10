import {Component, Inject, OnDestroy, OnInit, Optional} from '@angular/core';
import {VgToastOverlayRef} from './vg-toast-overlay-ref';
import {
  RUNTIME_TOAST_CONF,
  TOAST_ANIMATION,
  TOAST_CONF,
  TOAST_DATA,
  TOAST_OVERLAY_REF,
  VgToastAnimationState,
  VgToastConfig, VgToastData
} from './vg-toast.config';
import {AnimationEvent} from '@angular/animations';

@Component({
  selector: 'vg-toast',
  templateUrl: './vg-toast.component.html',
  styleUrls: ['./vg-toast.component.scss'],
  animations: [TOAST_ANIMATION.fadeToast],
})
export class VgToastComponent implements OnInit, OnDestroy {

  animationState: VgToastAnimationState = 'default';
  intervalId: number = 0;
  progress: number = 0;
  toastBefore!: VgToastOverlayRef | null;

  constructor(@Optional() @Inject(TOAST_DATA) readonly data: VgToastData,
              @Optional() @Inject(TOAST_OVERLAY_REF) readonly toastOverlayRef: VgToastOverlayRef,
              @Optional() @Inject(TOAST_CONF) readonly conf: VgToastConfig,
              @Optional() @Inject(RUNTIME_TOAST_CONF) readonly runtimeConf: VgToastConfig) {
    this.conf = {...this.conf, ...this.runtimeConf};
  }

  ngOnInit(): void {
    if (this.conf?.duration) {
      this.progress = 0;
      this.intervalId = setInterval(() => {
        if (this.conf.duration && this.progress >= (this.conf.duration)) {
          clearInterval(this.intervalId);
          this.progress = 0;
          this.animationState = 'closing';
        } else {
          this.progress += 10;
        }
      }, 10);
    }
  }

  close(): void {
    if (!this.conf.duration) {
      this.toastOverlayRef.close();
    }
  }

  onFadeFinished(event: AnimationEvent): void {
    const {toState} = event;
    const isFadeOut = (toState as VgToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.toastOverlayRef.close();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }

}
