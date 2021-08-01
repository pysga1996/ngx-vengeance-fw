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
import {VgTreeNode} from "../../../model/vg-tree-node";
import {VgTreeTableConfig} from "../../../model/vg-tree-table.config";
import {VgTreeNodeCheckboxEvent} from "../../../model/vg-tree-node-checkbox-event";

@Component({
  selector: 'vg-tree-table-item',
  templateUrl: './vg-tree-table-item.component.html',
  styleUrls: ['./vg-tree-table-item.component.scss']
})
export class VgTreeTableItemComponent implements OnInit {

  @Input() treeTableConfig!: VgTreeTableConfig;
  @Input() treeItem!: VgTreeNode<unknown>;
  @Input() paddingBlockConfig: any;
  @Output() onCheck: EventEmitter<VgTreeNodeCheckboxEvent> = new EventEmitter();
  @Output() onSelectRow: EventEmitter<VgTreeNode<unknown> | null> = new EventEmitter();
  @ViewChild('template', {static: true}) template!: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template);
  }


  expand(event: any, treeItem: VgTreeNode<unknown>) {
    event.stopPropagation();
    treeItem.expanded = !treeItem.expanded;
  }

  check(event: any, key: string) {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement)?.checked;
    (this.treeItem.data as any)[key] = checked;
    const config = this.treeTableConfig.columns.find(columnConfig => columnConfig.key === event.key);
    if (config?.checkboxHorizontalCascade) {
      config.checkboxHorizontalCascade.forEach(cascade => {
        if (checked) {
          (this.treeItem.data as any)[cascade.key] = true;
          this.treeItem.isDisabled[cascade.key] = true;
        } else {
          this.treeItem.isDisabled[cascade.key] = false;
        }
        this.onCheck.emit({
          key: cascade.key,
          checked: (this.treeItem.data as any)[cascade.key],
          node: this.treeItem,
        });
      });
    }
    this.onCheck.emit({
      key: key,
      checked: checked,
      node: this.treeItem,
    });
  }

  forwardCheck(event: VgTreeNodeCheckboxEvent) {
    const config = this.treeTableConfig.columns.find(columnConfig => columnConfig.key === event.key);
    if (config?.checkboxVerticalCascade) {
      (this.treeItem.data as any)[event.key] =
        this.treeItem.children.every(childNode => (childNode.data as any)[event.key]);
    }
    this.onCheck.emit(event);
  }

  selectRow(node: VgTreeNode<unknown> | null) {
    this.onSelectRow.emit(node)
  }

  forwardSelectRow(node: VgTreeNode<unknown> | null) {
    this.onSelectRow.emit(node);
  }
}
