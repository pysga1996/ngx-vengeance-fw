import {
  Directive,
  forwardRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[vgNumberOnly]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VgNumberOnlyDirective),
      multi: true,
    },
  ],
})
export class VgNumberOnlyDirective implements ControlValueAccessor {
  @Input() excludedCharsRegex = /[^+,?\d]/g;
  @Input() excludedNonLeadPlusMinusRegex = /(?<=[\d+]+)\+/g;
  private el!: HTMLInputElement;

  constructor(private renderer: Renderer2) {}

  onChange = (val: number): void => {
    console.debug(val);
  };

  onTouched = (): void => {
    console.debug();
  };

  writeValue(obj: never): void {
    const numberVal = isNaN(Number(obj)) ? 0 : Number(obj);
    this.el.value = numberVal.toString();
    // setTimeout(() => {
    //   this.onChange(numberVal);
    // }, 0);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event.target'])
  onInput(el: HTMLInputElement): void {
    if (el.type !== 'text') {
      return;
    }
    let start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const originalNonDigitCount =
      el.value.match(this.excludedCharsRegex)?.length || 0;
    const noDigitsString = el.value
      .toString()
      .replace(this.excludedCharsRegex, '');
    const newValue = noDigitsString
      .toString()
      .replace(this.excludedNonLeadPlusMinusRegex, '');
    const modifiedNonDigitCount: number =
      newValue.substring(0, start).match(this.excludedCharsRegex)?.length || 0;
    el.value = newValue;
    start += modifiedNonDigitCount - originalNonDigitCount;
    this.renderer.setProperty(el, 'selectionStart', start);
    this.renderer.setProperty(el, 'selectionEnd', start > end ? start : end);
  }
}
