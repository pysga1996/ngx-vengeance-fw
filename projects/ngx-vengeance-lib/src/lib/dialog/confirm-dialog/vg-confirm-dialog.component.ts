import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {Subject} from 'rxjs';
import {DIALOG_REF, VgDialogOverlayRef} from '../vg-dialog-overlay-ref';
import {
  DIALOG_ANIMATION,
  DIALOG_DATA,
  DIALOG_OPTIONS,
  VgDialogAnimationState,
  VgDialogData,
  VgDialogOptions
} from "../vg-dialog-config";
import {VgToastAnimationState} from "../../toast/vg-toast.config";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vg-confirm-dialog',
  templateUrl: 'vg-confirm-dialog.component.html',
  styleUrls: ['vg-confirm-dialog.component.scss'],
  animations: [DIALOG_ANIMATION.fadeDialog],
})
export class VgConfirmDialogComponent implements OnInit {

  public onClose = new Subject();
  public iconClass: any;
  public buttonCollection!: ElementRef<HTMLElement>[];
  public cursor = 1;
  animationState: VgToastAnimationState = 'default';

  @ViewChildren('confirmDialogButton') public buttonsQueryList!: QueryList<ElementRef<HTMLElement>>;

  constructor(@Inject(DIALOG_REF) public dialogOverlayRef: VgDialogOverlayRef,
              @Inject(DIALOG_DATA) public dialogData: VgDialogData,
              @Inject(DIALOG_OPTIONS) public dialogOptions: VgDialogOptions) {
  }

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
          this.cancel(event);
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
          if (this.cursor === 0) {
            this.cancel(event);
          } else {
            this.buttonCollection[this.cursor].nativeElement.click();
          }
          break;
      }
    }
  }

  public confirm($event: MouseEvent | KeyboardEvent): void {
    this.onClose.next(true);
    this.onClose.complete();
    this.dialogOverlayRef.close();
  }

  public cancel($event: MouseEvent | KeyboardEvent): void {
    this.onClose.next(false);
    this.onClose.complete();
    this.dialogOverlayRef.close();
  }

  public ngOnInit(): void {
    const focusToConfirmButton = setTimeout(() => {
      this.cursor = 1;
      this.buttonCollection = this.buttonsQueryList.toArray();
      this.buttonCollection[this.cursor].nativeElement.focus();
      clearTimeout(focusToConfirmButton);
    }, 0);
  }

  onFadeFinished(event: any) {
    const {toState} = event;
    const isFadeOut = (toState as VgDialogAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';
    if (isFadeOut && itFinished) {
      this.dialogOverlayRef.close();
    }
  }

}
