import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  VgTreeTableColumnConfig,
  VgTreeTableConfig,
} from '../../model/vg-tree-table.config';
import { VgTreeNode } from '../../model/vg-tree-node';

@Component({
  selector: 'vg-light-tree-table',
  templateUrl: './vg-light-tree-table.component.html',
  styleUrls: ['./vg-light-tree-table.component.scss'],
})
export class VgLightTreeTableComponent implements OnChanges {
  @Input() treeTableConfig: VgTreeTableConfig = {
    columns: [],
  };
  // eslint-disable-next-line
  @Input() treeItems: VgTreeNode<any>[] = [];
  // eslint-disable-next-line
  @Input() treeMap!: { [key: string]: VgTreeNode<any> };
  @Input() idKey = 'id';
  @Input() parentIdKey = 'parent_id';
  @Input() rootId = 'root';
  // eslint-disable-next-line
  @Output() selectRowEvent: EventEmitter<VgTreeNode<any> | undefined> =
    // eslint-disable-next-line
    new EventEmitter<VgTreeNode<any> | undefined>();
  // eslint-disable-next-line
  sortedNodeList: VgTreeNode<any>[] = [];
  // eslint-disable-next-line
  selectedNode: VgTreeNode<any> | undefined;
  // eslint-disable-next-line
  internalTreeMap: { [key: string]: VgTreeNode<any> } = {};
  useInternalTreeMap = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.treeItems) {
      this.useInternalTreeMap = !this.treeMap;
      if (!this.useInternalTreeMap) {
        this.internalTreeMap = this.treeMap;
      }
      // eslint-disable-next-line
      const nodeList: VgTreeNode<any>[] = [];
      const seqObj = { sequence: 0 };
      const initialPaddingBlock = { [0]: true };
      // eslint-disable-next-line
      const rootNode: VgTreeNode<any> = {
        data: { id: this.rootId, parentId: null },
        children: [],
        level: -1,
        isDisabled: {},
        isFixed: {},
        sequence: -1,
        paddingBlock: {},
      };
      this.treeItems.forEach((node, i) => {
        if (node.data[this.parentIdKey] !== this.rootId) {
          node.data[this.parentIdKey] = this.rootId;
        }
        rootNode.children.push(node);
        this.processTreeSequenceAndLevel(
          node,
          nodeList,
          seqObj,
          0,
          {
            ...initialPaddingBlock,
          },
          i === this.treeItems.length - 1
        );
      });
      if (this.useInternalTreeMap) {
        this.internalTreeMap[this.rootId] = rootNode;
      }
      nodeList.sort((a, b) => a.sequence - b.sequence);
      this.sortedNodeList = nodeList;
    }
  }

  processTreeSequenceAndLevel(
    // eslint-disable-next-line
    node: VgTreeNode<any>,
    // eslint-disable-next-line
    nodeList: VgTreeNode<any>[],
    seqObj: { sequence: number },
    level: number,
    paddingBlock: { [key: string]: boolean },
    isLastChild: boolean
  ): void {
    seqObj.sequence++;
    node.sequence = seqObj.sequence;
    node.level = level;
    node.paddingBlock = paddingBlock;
    nodeList.push(node);
    if (this.useInternalTreeMap) {
      this.internalTreeMap[node.data[this.idKey]] = node;
    }
    node.children.forEach((childNode, i) => {
      this.processTreeSequenceAndLevel(
        childNode,
        nodeList,
        seqObj,
        level + 1,
        {
          ...node.paddingBlock,
          [node.level]: !isLastChild,
        },
        i === node.children.length - 1
      );
    });
  }

  // eslint-disable-next-line
  selectRow(event: Event, treeItem?: VgTreeNode<any>): void {
    event.stopPropagation();
    this.selectedNode = treeItem;
    this.selectRowEvent.emit(this.selectedNode);
  }

  // eslint-disable-next-line
  hideChildren(treeItem: VgTreeNode<any>): void {
    treeItem.hidden = true;
    treeItem.children.forEach((childNode) => {
      this.hideChildren(childNode);
    });
  }

  // eslint-disable-next-line
  showChildren(treeItem: VgTreeNode<any>): void {
    treeItem.hidden = false;
    if (treeItem.expanded) {
      treeItem.children.forEach((childNode) => {
        this.showChildren(childNode);
      });
    } else {
      treeItem.children.forEach((childNode) => {
        this.hideChildren(childNode);
      });
    }
  }

  // eslint-disable-next-line
  expand(event: Event, treeItem: VgTreeNode<any>): void {
    event.stopPropagation();
    const expanded = !treeItem.expanded;
    treeItem.expanded = expanded;
    if (expanded) {
      treeItem.children.forEach((childNode) => {
        this.showChildren(childNode);
      });
    } else {
      treeItem.children.forEach((childNode) => {
        this.hideChildren(childNode);
      });
    }
  }

  // eslint-disable-next-line
  checkParents(treeItem: VgTreeNode<any>, key: string): void {
    // eslint-disable-next-line
    const parentNode: VgTreeNode<any> =
      this.internalTreeMap[treeItem.data[this.parentIdKey]];
    if (parentNode) {
      parentNode.data[key] = parentNode.children.every(
        (childNode) => childNode.data[key]
      );
      this.checkParents(parentNode, key);
    }
  }

  checkChildren(
    // eslint-disable-next-line
    treeItem: VgTreeNode<any>,
    key: string,
    checked: boolean
  ): void {
    treeItem.data[key] = checked;
    treeItem.children.forEach((childNode) => {
      this.checkChildren(childNode, key, checked);
    });
  }

  check(
    event: Event,
    columnConfig: VgTreeTableColumnConfig,
    // eslint-disable-next-line
    node: VgTreeNode<any>
  ): void {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement)?.checked;
    node.data[columnConfig.key] = checked;
    if (columnConfig?.checkboxVerticalCascade) {
      this.checkChildren(node, columnConfig.key, checked);
      this.checkParents(node, columnConfig.key);
    }
  }

  checkAll(event: Event, columnConfig: VgTreeTableColumnConfig): void {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement)?.checked;
    this.treeItems.forEach((node) => {
      this.checkChildren(node, columnConfig.key, checked);
    });
  }
}
