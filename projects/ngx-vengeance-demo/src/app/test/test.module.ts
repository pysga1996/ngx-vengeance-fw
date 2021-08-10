import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import {VgDialogModule, VgToastModule } from 'ngx-vengeance-lib';
// import {VgDialogModule, VgToastModule} from 'projects/ngx-vengeance-lib/src/public-api';
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
    VgToastModule,
    VgDialogModule.forRoot()
  ]
})
export class TestModule { }
