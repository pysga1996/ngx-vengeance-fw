import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[vgHoverClass]',
})
export class VgHoverClassDirective {
  focusedElement: ElementRef | undefined | null;

  constructor(public elementRef: ElementRef) {}

  @Input() hoverClass = '';

  @HostListener('mouseenter') onMouseEnter(): void {
    if (this.focusedElement) {
      return;
    }
    this.elementRef.nativeElement.classList.add(this.hoverClass);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.focusedElement) {
      return;
    }
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
  }

  @HostListener('focus') onFocus(): void {
    this.elementRef.nativeElement.classList.add(this.hoverClass);
    this.focusedElement = this.elementRef;
  }

  @HostListener('blur') onBlur(): void {
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
    this.focusedElement = null;
  }
}
