import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[vgNumberOnly]'
})
export class VgNumberOnlyDirective {

  @Input() excludedCharsRegex = /[^+,?\d]/g;

  @Input() excludedNonLeadPlusMinusRegex = /(?<=[\d+]+)\+/g;

  @HostListener('input', ['$event.target'])
  onInput(el: any): void {
    if (el.type === 'text') {
      const originalLength = el.value.length;
      const cursorPos = el.selectionStart;
      const noDigitsString = el.value.toString().replace(this.excludedCharsRegex, '');
      el.value = noDigitsString.toString().replace(this.excludedNonLeadPlusMinusRegex, '');
      const modifiedLength = el.value.length;
      el.selectionStart = cursorPos + modifiedLength - originalLength;
      el.selectionEnd = el.selectionStart;
    }
  }

}
