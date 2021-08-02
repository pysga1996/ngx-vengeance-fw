import {InjectionToken} from "@angular/core";
import {VgToastData} from "./vg-toast-data";
import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const TOAST_DATA = new InjectionToken<VgToastData>('TOAST_DATA');
export const TOAST_CONF = new InjectionToken<VgToastData>('TOAST_CONF');
export const TOAST_OVERLAY_REF = new InjectionToken<VgToastData>('TOAST_OVERLAY_REF');
export const RUNTIME_TOAST_CONF = new InjectionToken<VgToastData>('RUNTIME_TOAST_CONF');

export const TOAST_TYPE = {
  SUCCESS: {bgColor: '#51a351', textColor: 'black', iconClass: 'bi bi-check-circle-fill'},
  ERROR: {bgColor: '#bd362f', textColor: 'white', iconClass: 'bi bi-x-circle-fill'},
  WARNING: {bgColor: '#ffc107', textColor: 'black', iconClass: 'bi bi-exclamation-circle-fill'},
  INFO: {bgColor: '#2f96b4', textColor: 'white', iconClass: 'bi bi-question-circle-fill'},
  NORMAL: {bgColor: '#F8F8FF', textColor: 'black', iconClass: ''},
  CUSTOM: null
};

export const TOAST_POSITION = {
  TOP_LEFT: {top: '2rem', left: '2rem'},
  TOP_CENTER: {top: '2rem', horizontalAlignment: true},
  TOP_RIGHT: {top: '2rem', right: '2rem'},
  BOTTOM_LEFT: {bottom: '2rem', left: '2rem'},
  BOTTOM_CENTER: {bottom: '2rem', horizontalAlignment: true},
  BOTTOM_RIGHT: {bottom: '2rem', right: '2rem'},
  CENTER: {horizontalAlignment: true, verticalAlignment: true}
};

export const TOAST_SIZE = {
  SMALL_DIALOG: {width: '25rem', height: '10rem'},
  MEDIUM_DIALOG: {width: '50vw', height: '20rem'},
  LARGE_DIALOG: {width: '75vw', height: '30rem'}
};

export type ToastAnimationState = 'default' | 'closing';

export const TOAST_ANIMATION: {
  readonly fadeToast: AnimationTriggerMetadata;
} = {
  fadeToast: trigger('fadeAnimation', [
    state('in', style({ opacity: 1 })),
    transition('void => *', [style({ opacity: 0 }), animate('{{ fadeIn }}ms')]),
    transition(
      'default => closing',
      animate('{{ fadeOut }}ms', style({ opacity: 0 })),
    ),
  ]),
};

export interface VgToastConfig {
  position?: any;
  size?: any;
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
  duration?: number;
  type?: { bgColor: string; textColor: string; iconClass?: string };
  class?: string | string[] | Set<string> | {
    [klass: string]: any;
  };
}

export const defaultToastConfig: VgToastConfig = {
  position: TOAST_POSITION.TOP_CENTER,
  size: TOAST_SIZE.SMALL_DIALOG,
  animation: {
    fadeOut: 2500,
    fadeIn: 300,
  },
  duration: 2000,
  type: TOAST_TYPE.NORMAL
};

