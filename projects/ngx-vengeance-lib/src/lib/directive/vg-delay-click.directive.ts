import { EventEmitter } from '@angular/core';
import {
  Directive,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[vgDelayClick]',
})
export class VgDelayClickDirective implements OnInit, OnDestroy {
  @Input() delayTime = 1000;
  @Output() delayClick = new EventEmitter();
  private clickSubject = new Subject();
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.clickSubject
      .pipe(debounceTime(this.delayTime))
      .subscribe((e) => this.delayClick.emit(e));
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clickSubject.next(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
