import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[vgCurrencyInput]',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting:
      forwardRef(() => VgCurrencyInputDirective),
    multi: true
  }]
})
export class VgCurrencyInputDirective implements OnInit, ControlValueAccessor {

  @Input() currentLocale: string = 'vi-VN';
  private el!: HTMLInputElement;
  private delay: any;
  private thousandSeparator: RegExp = /(\.)/g;

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLInputElement>) {
    this.el = elementRef.nativeElement;
  }

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  writeValue(obj: any): void {
    const numberVal = isNaN(Number(obj)) ? 0 : Number(obj);
    this.el.value = numberVal.toLocaleString(this.currentLocale);
    // setTimeout(() => {
    //   this.onChange(numberVal);
    // }, 0);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    // this.thousandSeparator
    // this.currentLocale
    console.log(navigator.language);
    if (navigator.language) {
      this.currentLocale = 'en-US';
    }
    const testStr = 1000;
    const testFormattedStr = testStr.toLocaleString(this.currentLocale);
    if (testFormattedStr.match(/\./g)) {
      this.thousandSeparator = /\./g;
    } else {
      this.thousandSeparator = /,/g;
    }
  }

  @HostListener('input', ['$event.target'])
  // @HostListener('focusout', ['$event.target'])
  onInput(el: HTMLInputElement): void {
    this.renderUpdatedValue(el);
  }

  updateNumberValue(val: number) {
    this.onChange(val);
  }

  renderUpdatedValue(el: HTMLInputElement): void {
    clearTimeout(this.delay);
    this.delay = setTimeout((el: any) => {
      let start = el.selectionStart;
      const end = el.selectionEnd;
      const initialVal: string = el.value;
      const initialDotCount = initialVal.substring(0, start).match(this.thousandSeparator)?.length || 0;
      const strWithNoComma = el.value.toString().replace(this.thousandSeparator, '');
      const strDigitOnly = strWithNoComma.replace(/\D/g, '');
      const numberVal = Number(strDigitOnly);
      const newValue = numberVal.toLocaleString(this.currentLocale);
      const modifiedDotCount: number = newValue.substring(0, start).match(this.thousandSeparator)?.length || 0;
      // console.debug(initialDotCount, modifiedDotCount, el.selectionStart, el.selectionEnd);
      el.value = newValue;
      start += modifiedDotCount - initialDotCount;
      this.renderer.setProperty(el, 'selectionStart', start);
      this.renderer.setProperty(el, 'selectionEnd', start > end ? start : end);
      this.updateNumberValue(numberVal);
      clearTimeout(this.delay);
    }, 200, el);
  }
}
