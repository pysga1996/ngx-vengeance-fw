import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TreeNode} from "../../../model/tree-node";
import {TreeTableConfig} from "../../../model/tree-table-config";
import {Event} from "@angular/router";

export type TreeNodeCheckboxEvent = {
  checked: boolean;
  node: TreeNode<unknown>
}

@Component({
  selector: 'app-tree-table-item',
  templateUrl: './tree-table-item.component.html',
  styleUrls: ['./tree-table-item.component.scss']
})
export class TreeTableItemComponent implements OnInit {

  @Input() treeTableConfig!: TreeTableConfig;
  @Input() treeItem!: TreeNode<unknown>;
  @Input() paddingBlockConfig: any;
  @Output() onCheck: EventEmitter<TreeNodeCheckboxEvent> = new EventEmitter();
  @Output() onSelectRow: EventEmitter<TreeNode<unknown> | null> = new EventEmitter();
  @ViewChild('template', {static: true}) template!: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
      this.viewContainerRef.createEmbeddedView(this.template);
  }


  expand(event: any, treeItem: TreeNode<unknown>) {
    event.stopPropagation();
    treeItem.expanded = !treeItem.expanded;
  }

  check(event: any) {
    event.stopPropagation();
    this.onCheck.emit({
      checked: (event.target as HTMLInputElement)?.checked,
      node: this.treeItem
    });
  }

  forwardCheck(event: TreeNodeCheckboxEvent) {
    this.onCheck.emit(event);
  }

  selectRow(node: TreeNode<unknown> | null) {
    this.onSelectRow.emit(node)
  }

  forwardSelectRow(node: TreeNode<unknown> | null) {
    this.onSelectRow.emit(node);
  }
}
