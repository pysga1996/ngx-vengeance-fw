import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DIALOG_REF, VgDialogOverlayRef } from '../vg-dialog-overlay-ref';
import {
  DIALOG_ANIMATION,
  DIALOG_DATA,
  DIALOG_OPTIONS,
  VgDialogAnimationState,
  VgDialogData,
  VgDialogOptions,
} from '../vg-dialog-config';
import { VgToastAnimationState } from '../../toast/vg-toast.config';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vg-message-dialog',
  templateUrl: 'vg-message-dialog.component.html',
  styleUrls: ['vg-message-dialog.component.scss'],
  animations: [DIALOG_ANIMATION.fadeDialog],
})
export class VgMessageDialogComponent implements OnInit {
  public onClose = new Subject();
  public imageUrl!: string;
  public icon: string | string[] = '';
  public buttonCollection!: ElementRef<HTMLElement>[];
  public cursor = 1;
  animationState: VgToastAnimationState = 'default';

  @ViewChildren('messageButton') public buttonsQueryList!: QueryList<
    ElementRef<HTMLElement>
  >;

  constructor(
    @Inject(DIALOG_REF) public dialogOverlayRef: VgDialogOverlayRef,
    @Inject(DIALOG_DATA) public dialogData: VgDialogData,
    @Inject(DIALOG_OPTIONS) public dialogOptions: VgDialogOptions
  ) {}

  @HostListener('document:keydown', ['$event'])
  public onKeydownHandler(event: KeyboardEvent): void {
    event.preventDefault();
    if (event.shiftKey && event.key === 'Tab') {
      if (this.cursor === 0) {
        this.cursor = this.buttonCollection.length - 1;
      } else {
        this.cursor--;
      }
      this.buttonCollection[this.cursor].nativeElement.focus();
    } else {
      switch (event.key) {
        case 'Escape':
          this.ok();
          break;
        case 'Tab':
          if (this.cursor === this.buttonCollection.length - 1) {
            this.cursor = 0;
          } else {
            this.cursor++;
          }
          this.buttonCollection[this.cursor].nativeElement.focus();
          break;
        case 'Enter':
          this.ok();
          break;
      }
    }
  }

  public ngOnInit(): void {
    this.icon = this.dialogData?.iconClass
      ? '<i class="' + this.dialogData.iconClass + '"></i>'
      : '';
    const focusToOkButton = setTimeout(() => {
      this.cursor = 0;
      this.buttonCollection = this.buttonsQueryList.toArray();
      this.buttonCollection[this.cursor].nativeElement.focus();
      clearTimeout(focusToOkButton);
    }, 0);
  }

  public ok(): void {
    this.onClose.next(false);
    this.onClose.complete();
    this.dialogOverlayRef.close();
  }

  // eslint-disable-next-line
  onFadeFinished(event: any): void {
    const { toState } = event;
    const isFadeOut = (toState as VgDialogAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';
    if (isFadeOut && itFinished) {
      this.dialogOverlayRef.close();
    }
  }
}
