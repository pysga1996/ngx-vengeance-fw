import { InjectionToken } from '@angular/core';
import { VgToastData } from './vg-toast-data';

export const TOAST_CONF = new InjectionToken<VgToastData>('TOAST_CONF');
export const RUNTIME_TOAST_CONF = new InjectionToken<VgToastData>('RUNTIME_TOAST_CONF');

export const TOAST_TYPE = {
  SUCCESS: { bgColor: '#51a351', textColor: 'black', iconClass: 'fa fa-2x fa-check-circle'},
  ERROR: { bgColor: '#bd362f', textColor: 'white', iconClass: 'fa fa-2x fa-exclamation-circle'},
  WARNING: { bgColor: '#f89406', textColor: 'black', iconClass: 'fa fa-2x fa-warning'},
  INFO: { bgColor: '#2f96b4', textColor: 'white', iconClass: 'fa fa-2x fa-info-circle'},
  NORMAL: { bgColor: '#F8F8FF', textColor: 'black', iconClass: '' },
  CUSTOM: null
};

export const TOAST_POSITION = {
  TOP_LEFT: { top: '2rem', left: '2rem'},
  TOP_CENTER: { top: '2rem', horizontalAlignment: true },
  TOP_RIGHT: { top: '2rem', right: '2rem' },
  BOTTOM_LEFT: { bottom: '2rem', left: '2rem'},
  BOTTOM_CENTER: { bottom: '2rem', horizontalAlignment: true },
  BOTTOM_RIGHT: { bottom: '2rem', right: '2rem' },
  CENTER: { horizontalAlignment: true, verticalAlignment: true }
};

export const TOAST_SIZE = {
  SMALL_DIALOG: { width: '30vw', height: 'auto' },
  MEDIUM_DIALOG: { width: '60vw', height: 'auto'},
  LARGE_DIALOG: { width: '90vw', height: 'auto'}
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
