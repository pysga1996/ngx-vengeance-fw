import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'vg-tag-input',
  templateUrl: './vg-tag-input.component.html',
  styleUrls: ['./vg-tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VgTagInputComponent),
      multi: true,
    },
  ],
})
export class VgTagInputComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  // eslint-disable-next-line
  values: any[] = [];

  ngControl!: NgControl;
  text = '';
  // eslint-disable-next-line
  onChange = (val: any): void => {
    console.debug(val);
  };

  onTouched = (): void => {
    console.debug();
  };
  @Input() placeholder!: string;
  @Input() isDisabled!: boolean;
  @Input() isReadonly = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  // eslint-disable-next-line
  @Input() modelToTextConverter: (model: any) => string = (model) => model.name;
  // eslint-disable-next-line
  @Input() textToModelConverter: (text: string) => any = (text) => {
    return {
      name: text,
    };
  };
  @ViewChild('inputElement')
  inputElement!: ElementRef<HTMLInputElement>;

  constructor(private inj: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.classList.add(
        `form-control-${this.size}`
      );
    }
  }

  // eslint-disable-next-line
  writeValue(tagList: any[]): void {
    this.values = tagList;
    this.text = Array.from(
      new Set(this.values.map((e) => this.modelToTextConverter(e)))
    ).join(',');
  }

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  inputText(event: MouseEvent): void {
    const target = event.target as HTMLInputElement;
    this.values = target.value
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e !== '')
      .map((e) => this.textToModelConverter(e));
    this.onChange(this.values);
    this.onTouched();
  }
}
