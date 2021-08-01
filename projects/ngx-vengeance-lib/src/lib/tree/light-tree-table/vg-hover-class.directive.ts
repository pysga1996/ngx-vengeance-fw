import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[vgHoverClass]'
})
export class VgHoverClassDirective {

  focusedElement: ElementRef | undefined | null;

  constructor(public elementRef: ElementRef) {
  }

  @Input('hover-class') hoverClass: any;

  @HostListener('mouseenter') onMouseEnter() {
    if (this.focusedElement) {
      return;
    }
    this.elementRef.nativeElement.classList.add(this.hoverClass);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.focusedElement) {
      return;
    }
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
  }

  @HostListener('focus') onFocus() {
    this.elementRef.nativeElement.classList.add(this.hoverClass);
    this.focusedElement = this.elementRef;
  }

  @HostListener('blur') onBlur() {
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
    this.focusedElement = null;
  }

}
