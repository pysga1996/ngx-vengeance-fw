import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[vgDelayInput]',
})
export class VgDelayInputDirective implements OnInit, OnDestroy {
  @Input() delayTime = 1000;
  @Output() delayInput = new EventEmitter();
  private inputSubject = new Subject();
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.inputSubject
      .pipe(debounceTime(this.delayTime))
      .subscribe((e) => this.delayInput.emit(e));
  }

  @HostListener('input', ['$event'])
  clickEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.inputSubject.next(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
