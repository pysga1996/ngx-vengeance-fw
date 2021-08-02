import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { VgToastModule } from 'projects/ngx-vengeance-lib/src/public-api';
// import { VgToastModule } from 'ngx-vengeance-lib';


@NgModule({
  declarations: [
    TestComponent
  ],
  exports: [
    TestComponent
  ],
  imports: [
    CommonModule,
    VgToastModule
  ]
})
export class TestModule { }
