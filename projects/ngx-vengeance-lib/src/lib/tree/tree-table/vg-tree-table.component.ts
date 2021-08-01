import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VgTreeNode} from "../../model/vg-tree-node";
import {VgTreeTableConfig} from "../../model/vg-tree-table.config";
import {VgTreeNodeCheckboxEvent} from "../../model/vg-tree-node-checkbox-event";

@Component({
  selector: 'vg-tree-table',
  templateUrl: './vg-tree-table.component.html',
  styleUrls: ['./vg-tree-table.component.scss']
})
export class VgTreeTableComponent implements OnInit {

  @Input() treeTableConfig!: VgTreeTableConfig;
  @Input() treeItems: VgTreeNode<unknown>[] = [];
  @Output() onCheckNode: EventEmitter<VgTreeNodeCheckboxEvent> = new EventEmitter();
  @Output() onSelectRow: EventEmitter<VgTreeNode<unknown> | null | undefined> = new EventEmitter();
  selectedNode: VgTreeNode<unknown> | null | undefined;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.treeItems);
  }

  check(event: VgTreeNodeCheckboxEvent) {
    this.onCheckNode.emit(event);
  }

  selectRow(node: VgTreeNode<unknown> | null | undefined) {
    this.selectedNode = node;
    this.onSelectRow.emit(node);
  }
}
