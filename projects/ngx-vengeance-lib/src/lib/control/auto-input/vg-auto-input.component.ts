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
  // eslint-disable-next-line
  @Input() modelToTextMapper: (obj: any) => string = (obj: any): string =>
    obj['name'];
  // eslint-disable-next-line
  @Input() resultToModelMapper: (obj: any) => any = (obj: any): any => obj;
  // eslint-disable-next-line
  @Input() modelToImgSrcMapper: ((obj: any) => string) | null = (
    obj: any
  ): string => obj['url'];
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() isDisabled = false;
  // eslint-disable-next-line
  @Input() searchResults: any[] = [];
  @Input() limit = 10;
  @Input() placeholder = '';
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
    console.debug(val);
  };

  onTouched = (): void => {
    console.debug();
  };

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchResults) {
      this.searchResults = this.searchResults.slice(0, this.limit - 1);
    }
  }

  // eslint-disable-next-line
  selectResult(event: Event, result: any): void {
    this.value = this.resultToModelMapper(result);
    this.text = this.modelToTextMapper(result);
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
    this.text = this.modelToTextMapper(obj);
    this.changeValueEvent.emit(this.value);
  }
}
