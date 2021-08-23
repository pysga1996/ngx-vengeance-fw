import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
// import {VgDialogModule, VgToastModule } from 'ngx-vengeance-lib';
import {
  VgDialogModule,
  VgToastModule,
} from 'projects/ngx-vengeance-lib/src/public-api';

@NgModule({
  declarations: [TestComponent],
  exports: [TestComponent],
  imports: [CommonModule, VgToastModule.forRoot(), VgDialogModule.forRoot()],
})
export class TestModule {}
