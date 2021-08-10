import {
  Component,
  ElementRef,
  EventEmitter, Inject,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DIALOG_REF, VgDialogOverlayRef} from "../vg-dialog-overlay-ref";
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
  selector: 'app-modal-wrapper',
  templateUrl: './vg-dialog-wrapper.component.html',
  styleUrls: ['./vg-dialog-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [DIALOG_ANIMATION.fadeDialog]
})
export class VgDialogWrapperComponent {
  @Input() title = '';
  @Input() disableClose = false;
  @Output() closeAction = new EventEmitter();
  @ViewChild('content') content!: ElementRef;
  animationState: VgToastAnimationState = 'default';

  constructor(@Inject(DIALOG_REF) public dialogOverlayRef: VgDialogOverlayRef,
              @Inject(DIALOG_DATA) public dialogData: VgDialogData,
              @Inject(DIALOG_OPTIONS) public dialogOptions: VgDialogOptions) {
  }

  close() {
    this.closeAction.emit();
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
