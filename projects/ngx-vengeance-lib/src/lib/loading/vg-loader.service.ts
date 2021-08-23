import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class VgLoaderService {
  private loadingSubject$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  loading(value = false): void {
    this.loadingSubject$.next(value);
  }

  getLoader(): Observable<boolean> {
    return this.loadingSubject$;
  }
}
