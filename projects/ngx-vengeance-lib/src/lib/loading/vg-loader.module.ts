import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgLoaderComponent } from './vg-loader.component';
import { VgLoaderService } from './vg-loader.service';

@NgModule({
  declarations: [VgLoaderComponent],
  imports: [CommonModule],
  providers: [VgLoaderService],
  exports: [VgLoaderComponent],
})
export class VgLoaderModule {}
