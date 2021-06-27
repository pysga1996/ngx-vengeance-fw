import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

@Component({
  selector: 'vg-auto-input',
  templateUrl: './vg-auto-input.component.html',
  styleUrls: ['./vg-auto-input.component.scss']
})
export class VgAutoInputComponent implements OnInit, OnChanges, ControlValueAccessor {
  text: string = '';
  value: any = null;
  isFocused: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() searchResults: any[] = [];
  @Input() limit: number = 10;
  @Input() placeholder: string = '';
  @Input() nameField: string = 'name';
  @Input() valueField: string = 'value';
  @Input() imageField: string = '';
  @Output() onChangeText: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChangeValue: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('inputElement')
  inputElement!: ElementRef<HTMLInputElement>;

  onChange = (value: any) => {
  };

  onTouched = () => {
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchResults) {
      this.searchResults = this.searchResults.slice(0, this.limit - 1);
    }
  }

  emitResult(event: Event, result: any) {
    // console.log(event);
    this.value = result[this.valueField];
    this.text = result[this.nameField];
    this.inputElement.nativeElement.value = this.text;
    console.log(this.inputElement.nativeElement);
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
    this.onTouched();
  }

  focus() {
    if (this.isDisabled) {
      return;
    }
    this.isFocused = true;
  }

  blur(event: Event) {
    // console.log(event);
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
    this.onChangeValue.emit(this.value);
  }
}
