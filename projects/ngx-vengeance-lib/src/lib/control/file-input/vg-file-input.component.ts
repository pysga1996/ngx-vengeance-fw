import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { FileType, VgFileUtil } from '../../util/vg-file.util';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'vg-file-input',
  templateUrl: './vg-file-input.component.html',
  styleUrls: ['./vg-file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VgFileInputComponent),
      multi: true,
    },
  ],
})
export class VgFileInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Drop file here or click to browse a file';
  @Input() formData = new FormData();
  @Input() formDataFilePart = 'file';
  @Input() remoteFileType: FileType = 'generic';
  @Input() validateFn: (file: File) => boolean = () => true;
  @Output() metadataLoadedEvent: EventEmitter<Event> =
    new EventEmitter<Event>();
  @Output() fileSelectedEvent: EventEmitter<File> = new EventEmitter<File>();
  isDisabled = false;
  remoteFileSrc!: string | SafeResourceUrl | null;
  fileType: FileType = 'generic';
  file!: File | null;
  fileSrc!: string | SafeResourceUrl | null;
  fileReader: FileReader = new FileReader();
  ngControl!: NgControl;

  // eslint-disable-next-line
  onChange = (val: any): void => {
    console.log(val);
  };

  onTouched = (): void => {
    console.log();
  };
  remoteLoaded = true;

  constructor(
    private inj: Injector,
    private domSanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  writeValue(obj: never): void {
    this.remoteFileSrc = obj;
    if (!this.remoteFileSrc) return;
    this.http
      .get(this.remoteFileSrc, {
        observe: 'response',
        responseType: 'blob',
      })
      .subscribe(
        (response) => {
          const tmpFileType = response.body?.type;
          if (tmpFileType !== 'application/octet-stream') {
            this.remoteFileType = VgFileUtil.getFileType(response.body);
          }
        },
        (error) => {
          console.error(`Error: ${error.message}`);
        }
      );
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  selectFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.processFile(target.files[0]);
    }
  }

  onLoadedMetadata(event: Event): void {
    this.metadataLoadedEvent.emit(event);
  }

  dragover(event: DragEvent, dragZone: HTMLDivElement): void {
    event.preventDefault();
    dragZone.classList.add('file-dragover');
  }

  dragend(event: Event, dragZone: HTMLDivElement): void {
    event.preventDefault();
    dragZone.classList.remove('file-dragover');
  }

  drop(event: DragEvent, dragZone: HTMLDivElement): void {
    event.preventDefault();
    dragZone.classList.remove('file-dragover');
    if (event.dataTransfer?.files?.length) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  processFile(file: File): void {
    if (this.isDisabled) {
      return;
    }
    const isValid = this.validateFn(file);
    if (!isValid) return;
    this.file = file;
    console.log(file.type, typeof file.type, file.type === '');
    this.fileType = VgFileUtil.getFileType(this.file);
    if (this.fileType === 'audio' || this.fileType === 'video') {
      const url = URL.createObjectURL(this.file);
      this.fileSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      this.fileReader.readAsDataURL(this.file);
      this.fileReader.onload = (event) => {
        this.fileSrc = event.target?.result as string;
      };
    }
    this.onTouched();
    this.formData.set(this.formDataFilePart, this.file);
    this.fileSelectedEvent.emit(file);
  }

  clearFile(event: Event): void {
    event.stopPropagation();
    this.file = null;
    this.fileType = 'generic';
    this.fileSrc = null;
    this.onChange(this.remoteFileSrc ?? null);
    this.onTouched();
    this.formData.delete(this.formDataFilePart);
  }

  resolveRemote(value: boolean): void {
    this.remoteLoaded = value;
  }

  browseFile(fileInput: HTMLInputElement): void {
    if (this.isDisabled) return;
    fileInput.click();
  }

  onErrorLoad(): void {
    this.remoteFileSrc = null;
  }
}
