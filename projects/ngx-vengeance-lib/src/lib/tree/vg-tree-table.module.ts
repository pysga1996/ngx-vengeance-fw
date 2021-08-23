import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgTreeTableComponent } from './tree-table/vg-tree-table.component';
import { VgTreeTableItemComponent } from './tree-table/tree-table-item/vg-tree-table-item.component';
import { VgTreeTableBlockConfigPipe } from './tree-table/vg-tree-padding-block-config.pipe';
import { VgLightTreeTableComponent } from './light-tree-table/vg-light-tree-table.component';
import { VgTreeLevelArrayPipePipe } from './light-tree-table/vg-tree-level-array.pipe';
import { VgHoverClassDirective } from './light-tree-table/vg-hover-class.directive';

@NgModule({
  declarations: [
    VgTreeTableComponent,
    VgTreeTableItemComponent,
    VgTreeTableBlockConfigPipe,
    VgLightTreeTableComponent,
    VgTreeLevelArrayPipePipe,
    VgHoverClassDirective,
  ],
  imports: [CommonModule],
  exports: [
    VgTreeTableComponent,
    VgTreeTableItemComponent,
    VgTreeTableBlockConfigPipe,
    VgLightTreeTableComponent,
    VgTreeLevelArrayPipePipe,
  ],
})
export class VgTreeTableModule {}
