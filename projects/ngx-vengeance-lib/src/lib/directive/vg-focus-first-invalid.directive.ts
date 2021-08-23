import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Directive({
  selector: '[vgFocusFirstInvalid]'
})
export class VgFocusFirstInvalidDirective {

  @Input() form!: FormGroup;
  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit() {
    // const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
    //
    // if (invalidControl) {
    //   invalidControl.focus();
    // }
    if (this.form) {
      this.form.markAllAsTouched();
    }
    const invalidControls: NodeList = this.el.nativeElement.querySelectorAll('input.ng-invalid');
    if (invalidControls.length) {
      console.log(invalidControls);
      (invalidControls.item(0) as any).focus();
      invalidControls.forEach((node: any) => {
        node.classList.add('ng-touched')
      })
    }
  }
}
