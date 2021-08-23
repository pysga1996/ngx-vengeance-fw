import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[vgFocusFirstInvalid]',
})
export class VgFocusFirstInvalidDirective {
  @Input() form!: FormGroup;
  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit(): void {
    if (this.form) {
      this.form.markAllAsTouched();
    }
    const invalidControls: NodeList =
      this.el.nativeElement.querySelectorAll('input.ng-invalid');
    if (invalidControls.length) {
      (invalidControls.item(0) as HTMLInputElement).focus();
      invalidControls.forEach((node: Node) => {
        (node as HTMLInputElement).classList.add('ng-touched');
      });
    }
  }
}
