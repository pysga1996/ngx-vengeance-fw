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
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";

@Component({
  selector: 'vg-auto-input',
  templateUrl: './vg-auto-input.component.html',
  styleUrls: ['./vg-auto-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VgAutoInputComponent),
      multi: true
    }
  ]
})
export class VgAutoInputComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {
  text: string = '';
  value: any = null;
  isFocused: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md'
  @Input() isDisabled: boolean = false;
  @Input() searchResults: any[] = [];
  @Input() limit: number = 10;
  @Input() placeholder: string = '';
  @Input() nameField: string = 'name';
  @Input() valueField: string = 'value';
  @Input() imageField: string = '';
  @Input() itemTemplateRef!: TemplateRef<any>;
  @Input() itemTemplateCtx: Object | null = null;
  @Output() onChangeText: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChangeValue: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('inputElement')
  inputElement!: ElementRef<HTMLInputElement>;
  ngControl!: NgControl;
  status: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED' = 'VALID';

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  constructor(private inj: Injector) {
    // ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
    console.log(this.ngControl);
  }

  ngAfterViewInit() {
    if (this.inputElement) {
      this.inputElement.nativeElement.classList.add(`form-control-${this.size}`);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchResults) {
      this.searchResults = this.searchResults.slice(0, this.limit - 1);
    }
  }

  emitResult(event: Event, result: any) {
    this.value = this.valueField ? result[this.valueField] : result;
    this.text = result[this.nameField];
    this.inputElement.nativeElement.value = this.text;
    this.onChangeText.emit(this.text);
    this.onChangeValue.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
    this.isFocused = false;
  }

  inputText(event: Event) {
    if (this.isDisabled) {
      return;
    }
    if (!this.isFocused) {
      this.isFocused = true;
    }
    this.text = (event.target as HTMLInputElement).value
    this.onChangeText.emit(this.text);
    this.onChange(null);
    this.onTouched();
  }

  focus() {
    if (this.isDisabled) {
      return;
    }
    this.isFocused = true;
    this.inputElement.nativeElement.focus();
  }

  blur(_: Event) {
    if (this.isDisabled) {
      return;
    }
    this.isFocused = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (typeof this.value === 'string') {
      this.text = this.value;
    }
    this.onChangeValue.emit(this.value);
  }
}
