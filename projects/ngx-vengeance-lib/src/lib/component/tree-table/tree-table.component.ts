import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeNode} from "../../model/tree-node";
import {TreeNodeCheckboxEvent} from "./tree-table-item/tree-table-item.component";
import {TreeTableConfig} from "../../model/tree-table-config";

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {

  @Input() treeTableConfig!: TreeTableConfig;
  @Input() treeItems: TreeNode<unknown>[] = [];
  @Output() onCheckNode: EventEmitter<TreeNodeCheckboxEvent> = new EventEmitter();
  @Output() onSelectRow: EventEmitter<TreeNode<unknown> | null | undefined> = new EventEmitter();
  selectedNode: TreeNode<unknown> | null | undefined;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.treeItems);
  }

  check(event: TreeNodeCheckboxEvent) {
    this.onCheckNode.emit(event);
  }

  selectRow(node: TreeNode<unknown> | null | undefined) {
    this.selectedNode = node;
    this.onSelectRow.emit(node);
  }
}
