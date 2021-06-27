import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeTableComponent} from "./tree-table/tree-table.component";
import {TreeTableItemComponent} from "./tree-table/tree-table-item/tree-table-item.component";
import {TreePaddingBlockConfigPipe} from "../pipe/tree-padding-block-config.pipe";

@NgModule({
  declarations: [
    TreeTableComponent,
    TreeTableItemComponent,
    TreePaddingBlockConfigPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TreeTableComponent,
    TreeTableItemComponent,
    TreePaddingBlockConfigPipe
  ]
})
export class VgComponentModule {
}
