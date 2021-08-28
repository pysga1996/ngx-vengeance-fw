import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgScrollerComponent } from './infinitive-scroll/item-scroller/vg-scroller.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VgScrollerService } from './infinitive-scroll/vg-scroller.service';

@NgModule({
  declarations: [VgScrollerComponent],
  imports: [CommonModule, ScrollingModule],
  exports: [VgScrollerComponent],
  providers: [VgScrollerService],
})
export class VgLayoutModule {}
