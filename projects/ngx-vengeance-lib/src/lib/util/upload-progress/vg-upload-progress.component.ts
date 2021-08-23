import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { VgProgressResponse } from './vg-progress-response';

@Component({
  selector: 'vg-upload-progress',
  templateUrl: './vg-upload-progress.component.html',
  styleUrls: ['./vg-upload-progress.component.scss'],
})
export class VgUploadProgressComponent implements OnChanges, OnDestroy {
  @Input() httpObs!: Observable<HttpEvent<unknown>>;
  @Input() successMsg = 'Upload successfully';
  @Input() failureMsg = '';
  // eslint-disable-next-line
  @Output() successEvent: EventEmitter<any> = new EventEmitter<any>();
  // eslint-disable-next-line
  @Output() failureEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() completeEvent: EventEmitter<void> = new EventEmitter<void>();
  subscription: Subscription = new Subscription();
  responseData: VgProgressResponse = {
    type: 'info',
    data: 0,
    progress: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.httpObs && this.httpObs) {
      if (this.subscription && !this.subscription.closed) {
        this.subscription.unsubscribe();
      }
      this.responseData = {
        type: 'info',
        data: 0,
        progress: 0,
      };
      this.subscription = this.httpObs.subscribe(
        // eslint-disable-next-line
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.debug('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.debug('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.responseData.progress = Math.round(
                (event.loaded / (event.total || 1)) * 100
              );
              this.responseData.data = this.responseData.progress;
              console.debug(`Uploaded! ${this.responseData.data}%`);
              break;
            case HttpEventType.Response:
              console.debug('Successfully created!', event.body);
              this.responseData.data = 0;
              setTimeout(() => {
                this.successEvent.emit(event.body);
                this.responseData = {
                  type: 'success',
                  data: this.successMsg,
                  progress: 100,
                };
              }, 1500);
          }
        },
        (error) => {
          console.error(error);
          this.failureEvent.emit(error);
          this.responseData = {
            type: 'danger',
            data: this.failureMsg ?? error?.message,
            progress: 100,
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
