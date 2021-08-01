import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TOAST_DATA, VgToastData } from './vg-toast-data';
import { TOAST_REF, VgToastRef } from './vg-toast-ref';
import { RUNTIME_TOAST_CONF, TOAST_CONF, VgToastConfig } from './vg-toast.config';
import { TOAST_ANIMATION, ToastAnimationState } from './vg-toast-animation';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'vg-toast',
  templateUrl: './vg-toast.component.html',
  styleUrls: ['./vg-toast.component.scss'],
  animations: [TOAST_ANIMATION.fadeToast],
})
export class VgToastComponent implements OnInit, OnDestroy {

  animationState: ToastAnimationState = 'default';
  intervalId: number = 0;
  progress: number = 0;

  constructor(@Inject(TOAST_DATA) readonly data: VgToastData,
              @Inject(TOAST_REF) readonly ref: VgToastRef,
              @Inject(TOAST_CONF) readonly conf: VgToastConfig,
              @Inject(RUNTIME_TOAST_CONF) readonly runtimeConf: VgToastConfig) {
    this.conf = { ...this.conf, ...this.runtimeConf };
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
      this.ref.close();
    }
  }

  onFadeFinished(event: AnimationEvent): void {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.ref.close();
    }
  }

  ngOnDestroy(): void {
    // clearTimeout(this.intervalId);
  }

}
