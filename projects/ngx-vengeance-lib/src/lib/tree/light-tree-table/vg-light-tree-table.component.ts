import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {VgTreeTableColumnConfig, VgTreeTableConfig} from "../../model/vg-tree-table.config";
import {VgTreeNode} from "../../model/vg-tree-node";


@Component({
  selector: 'vg-light-tree-table',
  templateUrl: './vg-light-tree-table.component.html',
  styleUrls: ['./vg-light-tree-table.component.scss'],
})
export class VgLightTreeTableComponent implements OnChanges {

  @Input() treeTableConfig: VgTreeTableConfig = {
    columns: [],
  };
  @Input() treeItems: VgTreeNode<unknown>[] = [];
  @Input() treeMap!: { [key: string]: VgTreeNode<unknown> };
  @Input() idKey: string = 'id';
  @Input() parentIdKey: string = 'parent_id';
  @Input() rootId: string = 'root';
  @Output() onSelectRow: EventEmitter<VgTreeNode<unknown> | undefined> =
    new EventEmitter<VgTreeNode<unknown> | undefined>();
  sortedNodeList: VgTreeNode<unknown>[] = [];
  selectedNode: VgTreeNode<unknown> | undefined;
  internalTreeMap: { [key: string]: VgTreeNode<unknown> } = {};
  useInternalTreeMap: boolean = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.treeItems) {
      // console.debug(this.treeItems);
      this.useInternalTreeMap = !this.treeMap;
      if (!this.useInternalTreeMap) {
        this.internalTreeMap = this.treeMap;
      }
      const nodeList: VgTreeNode<unknown>[] = [];
      const seqObj = {sequence: 0};
      const initialPaddingBlock = {[0]: true};
      const rootNode: VgTreeNode<unknown> = {
        data: {id: this.rootId, parentId: null},
        children: [],
        level: -1,
        isDisabled: {},
        isFixed: {},
        sequence: -1,
        paddingBlock: {}
      }
      this.treeItems.forEach((node, i) => {
        if ((node.data as any)[this.parentIdKey] === this.rootId) {

        } else {
          (node.data as any)[this.parentIdKey] = this.rootId;
        }
        rootNode.children.push(node);
        this.processTreeSequenceAndLevel(node, nodeList, seqObj, 0,
          {
            ...initialPaddingBlock,
          }, i === this.treeItems.length - 1);
      });
      if (this.useInternalTreeMap) {
        this.internalTreeMap[this.rootId] = rootNode;
      }
      nodeList.sort((a, b) => a.sequence - b.sequence);
      this.sortedNodeList = nodeList;
      // console.debug(this.sortedNodeList);
      // console.debug(this.treeHashmap);
    }
  }

  processTreeSequenceAndLevel(node: VgTreeNode<unknown>, nodeList: VgTreeNode<unknown>[],
                              seqObj: { sequence: number }, level: number,
                              paddingBlock: { [key: string]: boolean }, isLastChild: boolean): void {
    seqObj.sequence++;
    node.sequence = seqObj.sequence;
    node.level = level;
    node.paddingBlock = paddingBlock;
    nodeList.push(node);
    if (this.useInternalTreeMap) {
      this.internalTreeMap[(node.data as any)[this.idKey]] = node;
    }
    node.children.forEach((childNode, i) => {
      this.processTreeSequenceAndLevel(childNode, nodeList, seqObj, level + 1,
        {
          ...node.paddingBlock,
          [node.level]: !isLastChild,
        }, i === node.children.length - 1);
    });
  }

  selectRow(event: Event, treeItem?: VgTreeNode<unknown>) {
    event.stopPropagation();
    this.selectedNode = treeItem;
    this.onSelectRow.emit(this.selectedNode);
  }

  hideChildren(treeItem: VgTreeNode<unknown>): void {
    treeItem.hidden = true;
    treeItem.children.forEach(childNode => {
      this.hideChildren(childNode);
    });
  }

  showChildren(treeItem: VgTreeNode<unknown>): void {
    treeItem.hidden = false;
    if (treeItem.expanded) {
      treeItem.children.forEach(childNode => {
        this.showChildren(childNode);
      });
    } else {
      treeItem.children.forEach(childNode => {
        this.hideChildren(childNode);
      });
    }
  }

  expand(event: any, treeItem: VgTreeNode<unknown>) {
    event.stopPropagation();
    const expanded = !treeItem.expanded;
    treeItem.expanded = expanded;
    if (expanded) {
      treeItem.children.forEach(childNode => {
        this.showChildren(childNode);
      });
    } else {
      treeItem.children.forEach(childNode => {
        this.hideChildren(childNode);
      });
    }
  }

  checkParents(treeItem: VgTreeNode<unknown>, key: string): void {
    const parentNode: VgTreeNode<unknown> = this.internalTreeMap[(treeItem.data as any)[this.parentIdKey]];
    if (parentNode) {
      (parentNode.data as any)[key] =
        parentNode.children.every(childNode => (childNode.data as any)[key]);
      this.checkParents(parentNode, key);
    }
  }

  checkChildren(treeItem: VgTreeNode<unknown>, key: string, checked: boolean): void {
    (treeItem.data as any)[key] = checked;
    treeItem.children.forEach(childNode => {
      this.checkChildren(childNode, key, checked);
    });
  }

  check(event: any, columnConfig: VgTreeTableColumnConfig, node: VgTreeNode<unknown>) {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement)?.checked;
    (node.data as any)[columnConfig.key] = checked;
    if (columnConfig?.checkboxVerticalCascade) {
      this.checkChildren(node, columnConfig.key, checked);
      this.checkParents(node, columnConfig.key);
    }
  }

  checkAll(event: Event, columnConfig: VgTreeTableColumnConfig) {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement)?.checked;
    this.treeItems.forEach(node => {
      this.checkChildren(node, columnConfig.key, checked);
    })
  }
}
