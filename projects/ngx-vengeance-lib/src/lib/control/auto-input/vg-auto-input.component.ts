import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'vg-auto-input',
  templateUrl: './vg-auto-input.component.html',
  styleUrls: ['./vg-auto-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VgAutoInputComponent),
      multi: true,
    },
  ],
})
export class VgAutoInputComponent
  implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor
{
  text = '';
  // eslint-disable-next-line
  value: any = null;
  isFocused = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() isDisabled = false;
  // eslint-disable-next-line
  @Input() searchResults: any[] = [];
  @Input() limit = 10;
  @Input() placeholder = '';
  @Input() nameField = 'name';
  @Input() valueField = 'value';
  @Input() imageField = '';
  // eslint-disable-next-line
  @Input() itemTemplateRef!: TemplateRef<any>;
  // eslint-disable-next-line
  @Input() itemTemplateCtx: any = null;
  @Output() changeTextEvent: EventEmitter<string> = new EventEmitter<string>();
  // eslint-disable-next-line
  @Output() changeValueEvent: EventEmitter<any> =
    // eslint-disable-next-line
    new EventEmitter<any>();
  @ViewChild('inputElement')
  inputElement!: ElementRef<HTMLInputElement>;
  ngControl!: NgControl;
  status: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED' = 'VALID';

  // eslint-disable-next-line
  onChange = (val: any): void => {
    console.log(val);
  };

  onTouched = (): void => {
    console.log();
  };

  constructor(private inj: Injector) {}

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
    console.log(this.ngControl);
  }

  ngAfterViewInit(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.classList.add(
        `form-control-${this.size}`
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchResults) {
      this.searchResults = this.searchResults.slice(0, this.limit - 1);
    }
  }

  // eslint-disable-next-line
  emitResult(event: Event, result: any): void {
    this.value = this.valueField ? result[this.valueField] : result;
    this.text = result[this.nameField];
    this.inputElement.nativeElement.value = this.text;
    this.changeTextEvent.emit(this.text);
    this.changeValueEvent.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
    this.isFocused = false;
  }

  inputText(event: Event): void {
    if (this.isDisabled) {
      return;
    }
    if (!this.isFocused) {
      this.isFocused = true;
    }
    this.text = (event.target as HTMLInputElement).value;
    this.changeTextEvent.emit(this.text);
    this.onChange(null);
    this.onTouched();
  }

  focus(): void {
    if (this.isDisabled) {
      return;
    }
    this.isFocused = true;
    this.inputElement.nativeElement.focus();
  }

  blur(): void {
    if (this.isDisabled) {
      return;
    }
    this.isFocused = false;
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

  // eslint-disable-next-line
  writeValue(obj: any): void {
    this.value = obj;
    this.text = String(this.value);
    this.changeValueEvent.emit(this.value);
  }
}
