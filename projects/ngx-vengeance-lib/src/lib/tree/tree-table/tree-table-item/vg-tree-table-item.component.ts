import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { VgTreeNode } from '../../../model/vg-tree-node';
import {
  VgTreeTableColumnConfig,
  VgTreeTableConfig,
} from '../../../model/vg-tree-table.config';
import { VgTreeNodeCheckboxEvent } from '../../../model/vg-tree-node-checkbox-event';

@Component({
  selector: 'vg-tree-table-item',
  templateUrl: './vg-tree-table-item.component.html',
  styleUrls: ['./vg-tree-table-item.component.scss'],
})
export class VgTreeTableItemComponent implements OnInit {
  @Input() treeTableConfig!: VgTreeTableConfig;
  // eslint-disable-next-line
  @Input() treeItem!: VgTreeNode<any>;
  // eslint-disable-next-line
  @Input() paddingBlockConfig!: any;
  @Output() checkEvent: EventEmitter<VgTreeNodeCheckboxEvent> =
    new EventEmitter();
  // eslint-disable-next-line
  @Output() selectRowEvent: EventEmitter<VgTreeNode<any> | null> =
    new EventEmitter();
  @ViewChild('template', { static: true }) template!: TemplateRef<never>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  expand(event: Event, treeItem: VgTreeNode<unknown>): void {
    event.stopPropagation();
    treeItem.expanded = !treeItem.expanded;
  }

  check(event: Event, key: string, config: VgTreeTableColumnConfig): void {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement)?.checked;
    this.treeItem.data[key] = checked;
    if (config?.checkboxHorizontalCascade) {
      config.checkboxHorizontalCascade.forEach((cascade) => {
        if (checked) {
          this.treeItem.data[cascade.key] = true;
          this.treeItem.isDisabled[cascade.key] = true;
        } else {
          this.treeItem.isDisabled[cascade.key] = false;
        }
        this.checkEvent.emit({
          key: cascade.key,
          checked: this.treeItem.data[cascade.key],
          node: this.treeItem,
        });
      });
    }
    this.checkEvent.emit({
      key: key,
      checked: checked,
      node: this.treeItem,
    });
  }

  forwardCheck(event: VgTreeNodeCheckboxEvent): void {
    const config = this.treeTableConfig.columns.find(
      (columnConfig) => columnConfig.key === event.key
    );
    if (config?.checkboxVerticalCascade) {
      this.treeItem.data[event.key] = this.treeItem.children.every(
        (childNode) => childNode.data[event.key]
      );
    }
    this.checkEvent.emit(event);
  }

  selectRow(node: VgTreeNode<unknown> | null): void {
    this.selectRowEvent.emit(node);
  }

  forwardSelectRow(node: VgTreeNode<unknown> | null): void {
    this.selectRowEvent.emit(node);
  }
}
