import { Component } from '@angular/core';
import { VgLoaderService } from './vg-loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'vg-loader',
  templateUrl: './vg-loader.component.html',
  styleUrls: ['./vg-loader.component.scss'],
})
export class VgLoaderComponent {
  loading$: Observable<boolean>;

  constructor(private loaderService: VgLoaderService) {
    this.loading$ = this.loaderService.getLoader();
  }
}
