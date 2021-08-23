import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {VgProgressResponse} from './vg-progress-response';

@Component({
  selector: 'vg-upload-progress',
  templateUrl: './vg-upload-progress.component.html',
  styleUrls: ['./vg-upload-progress.component.scss']
})
export class VgUploadProgressComponent implements OnChanges, OnDestroy {
  @Input() httpObs!: Observable<HttpEvent<any>>;
  @Input() successMsg: string = 'Upload successfully';
  @Input() failureMsg: string = '';
  @Output() successEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() failureEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() completeEvent: EventEmitter<void> = new EventEmitter<void>();
  subscription: Subscription = new Subscription();
  responseData: VgProgressResponse = {
    type: 'info',
    data: 0
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.httpObs && this.httpObs) {
      if (this.subscription && !this.subscription.closed) {
        this.subscription.unsubscribe();
      }
      this.responseData = {
        type: 'info',
        data: 0
      };
      this.subscription = this.httpObs.subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.debug('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.debug('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.responseData.data = Math.round((event.loaded / (event.total || 1)) * 100);
              console.debug(`Uploaded! ${this.responseData.data}%`);
              break;
            case HttpEventType.Response:
              console.debug('Successfully created!', event.body);
              this.responseData.data = 0;
              setTimeout(() => {
                this.successEvent.emit(event.body);
                this.responseData = {
                  type: 'success',
                  data: this.successMsg
                };
              }, 1500);
          }
        },
        error => {
          console.error(error);
          this.failureEvent.emit(error);
          this.responseData = {
            type: 'danger',
            data: this.failureMsg ?? error?.message
          };
        },
        () => {
          console.debug('Complete!');
          this.completeEvent.emit();
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
