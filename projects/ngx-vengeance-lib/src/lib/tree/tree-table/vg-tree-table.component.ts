import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VgTreeNode } from '../../model/vg-tree-node';
import { VgTreeTableConfig } from '../../model/vg-tree-table.config';
import { VgTreeNodeCheckboxEvent } from '../../model/vg-tree-node-checkbox-event';

@Component({
  selector: 'vg-tree-table',
  templateUrl: './vg-tree-table.component.html',
  styleUrls: ['./vg-tree-table.component.scss'],
})
export class VgTreeTableComponent implements OnInit {
  @Input() treeTableConfig!: VgTreeTableConfig;
  @Input() treeItems: VgTreeNode<unknown>[] = [];
  @Output() checkNodeEvent: EventEmitter<VgTreeNodeCheckboxEvent> =
    new EventEmitter();
  @Output() selectRowEvent: EventEmitter<
    VgTreeNode<unknown> | null | undefined
  > = new EventEmitter();
  selectedNode: VgTreeNode<unknown> | null | undefined;

  ngOnInit(): void {
    console.log(this.treeItems);
  }

  check(event: VgTreeNodeCheckboxEvent): void {
    this.checkNodeEvent.emit(event);
  }

  selectRow(node: VgTreeNode<unknown> | null | undefined): void {
    this.selectedNode = node;
    this.selectRowEvent.emit(node);
  }
}
