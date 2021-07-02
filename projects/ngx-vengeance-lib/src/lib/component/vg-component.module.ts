import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeTableComponent} from "./tree-table/tree-table.component";
import {TreeTableItemComponent} from "./tree-table/tree-table-item/tree-table-item.component";
import {TreePaddingBlockConfigPipe} from "../pipe/tree-padding-block-config.pipe";
import {HighPerformanceTreeTableComponent} from "./high-performance-tree-table/high-performance-tree-table.component";
import {TreeLevelArrayPipe} from "../pipe/tree-level-array.pipe";

@NgModule({
  declarations: [
    TreeTableComponent,
    TreeTableItemComponent,
    TreePaddingBlockConfigPipe,
    HighPerformanceTreeTableComponent,
    TreeLevelArrayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TreeTableComponent,
    TreeTableItemComponent,
    TreePaddingBlockConfigPipe,
    HighPerformanceTreeTableComponent,
    TreeLevelArrayPipe
  ]
})
export class VgComponentModule {
}
