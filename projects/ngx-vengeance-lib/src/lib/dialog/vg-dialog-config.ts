import {InjectionToken} from '@angular/core';
import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export const DIALOG_DATA = new InjectionToken<VgDialogData>('DIALOG_DATA');

export const DIALOG_OPTIONS = new InjectionToken<VgDialogOptions>('DIALOG_OPTIONS');

export const DIALOG_TYPE = {
  SUCCESS: {bgColor: '#98FB98', textColor: 'black'},
  ERROR: {bgColor: '#FF6347', textColor: 'white'},
  WARNING: {bgColor: '#F0E68C', textColor: 'black'},
  INFO: {bgColor: '#87CEEB', textColor: 'white'},
  NORMAL: {bgColor: '#F8F8FF', textColor: 'black'},
  CUSTOM: null
};

export const DIALOG_POSITION = {
  TOP_LEFT: {top: '32', left: '32'},
  TOP_CENTER: {top: '32', horizontalAlignment: true},
  TOP_RIGHT: {top: '32', right: '32'},
  BOTTOM_LEFT: {bottom: '2rem', left: '2rem'},
  BOTTOM_CENTER: {bottom: '2rem', horizontalAlignment: true},
  BOTTOM_RIGHT: {bottom: '2rem', right: '2rem'},
  CENTER: {horizontalAlignment: true, verticalAlignment: true}
};

export const DIALOG_SIZE = {
  SMALL_DIALOG: {width: '30vw', height: 'auto'},
  MEDIUM_DIALOG: {width: '60vw', height: 'auto'},
  LARGE_DIALOG: {width: '90vw', height: 'auto'}
};

export interface VgDialogOptions {
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string | string[];
  disposeOnNavigation?: boolean;
  top?: string;
  size: {
    width?: number | string;
    height?: number | string;
  }
  type?: { bgColor?: string; textColor?: string; };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}


export interface VgDialogButton {
  label: string;
  className: string;
}

export interface VgDialogButtons {
  confirm?: VgDialogButton;
  cancel?: VgDialogButton;
}

export type VgDialogAnimationState = 'default' | 'closing';

export interface VgDialogData {
  title?: string;
  message?: string;
  buttons?: VgDialogButtons;
  imageUrl?: string;
  iconClass?: string;
  sound?: string;
}

export const DIALOG_ANIMATION: {
  readonly fadeDialog: AnimationTriggerMetadata;
} = {
  fadeDialog: trigger('fadeAnimation', [
    state('in', style({opacity: 1})),
    transition('void => *', [style({opacity: 0}), animate('{{ fadeIn }}ms')]),
    transition(
      'default => closing',
      animate('{{ fadeOut }}ms', style({opacity: 0})),
    ),
  ]),
};


