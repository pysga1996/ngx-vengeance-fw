import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {TreeTableColumnConfig, TreeTableConfig} from "./tree-table-config";
import {TreeNode} from "./tree-node";
import {VgTreeNode} from "../../../../ngx-vengeance-lib/src/lib/model/vg-tree-node";


@Component({
  selector: 'ngx-high-performance-tree-table',
  templateUrl: './high-performance-tree-table.component.html',
  styleUrls: ['./high-performance-tree-table.component.scss'],
})
export class HighPerformanceTreeTableComponent implements OnChanges {

  @Input() treeTableConfig: TreeTableConfig | null = {
    columns: [],
  };
  @Input() treeItems: TreeNode<unknown>[] = [];
  treeHashmap: { [key: string]: TreeNode<unknown> } = {};
  sortedNodeList: TreeNode<unknown>[] = [];

  @Input() isUnitTree: boolean = false;
  @ViewChild('tableBody') tableBody!: ElementRef;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.treeItems) {
      const nodeList: TreeNode<unknown>[] = [];
      const seqObj = {sequence: 0};
      const initialPaddingBlock = {[0]: true};
      this.treeItems.forEach((node, i) => {
        this.processTreeSequenceAndLevel(node, nodeList, seqObj, 0,
          {
            ...initialPaddingBlock,
          }, i === this.treeItems.length - 1);
        // if ((node.data as any)[this.parentIdKey] === this.rootId) {
        //
        // } else {
        //   (node.data as any)[this.parentIdKey] = this.rootId;
        // }
        if (this.isUnitTree) {
          if (node.children.length >= 1) {
            node.expanded = false;
            node.children.forEach(child => {
              this.hideChildren(child)
            })
          }
        }
      });
      nodeList.sort((a, b) => a.sequence - b.sequence);
      this.sortedNodeList = nodeList;
      console.log("sortedNOdeList", this.sortedNodeList);
      if (this.tableBody) {
        if (this.treeItems.length === 1) {
          this.tableBody.nativeElement.classList.add('only-one-root');
        } else {
          this.tableBody.nativeElement.classList.remove('only-one-root');
        }
      }
    }
  }

  processTreeSequenceAndLevel(node: TreeNode<unknown>, nodeList: TreeNode<unknown>[],
                              seqObj: { sequence: number }, level: number,
                              paddingBlock: { [key: string]: boolean }, isLastChild: boolean): void {
    seqObj.sequence++;
    node.sequence = seqObj.sequence;
    node.level = level;
    node.paddingBlock = paddingBlock;
    nodeList.push(node);
    node.children.forEach((childNode, i) => {
      this.processTreeSequenceAndLevel(childNode, nodeList, seqObj, level + 1,
        {
          ...node.paddingBlock,
          [node.level]: !isLastChild,
        }, i === node.children.length - 1);
    });

    // seqObj.sequence++;
    // node.sequence = seqObj.sequence;
    // node.level = level;
    // node.paddingBlock = parentPaddingBlock;
    // nodeList.push(node);
    // node.children.forEach((childNode, i) => {
    // this.processTreeSequenceAndLevel(childNode, nodeList, seqObj, level + 1,
    //     {
    //     ...node.paddingBlock,
    //     [node.level]: !isLastChild,
    //     }, i === node.children.length - 1);
    // });
  }

  selectRow(treeItem: TreeNode<unknown> | null) {
  }

  hideChildren(treeItem: TreeNode<unknown>): void {
    treeItem.hidden = true;
    treeItem.children.forEach(childNode => {
      this.hideChildren(childNode);
    });
  }

  showChildren(treeItem: TreeNode<unknown>): void {
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

  setExpanded(treeItem: TreeNode<unknown>, expanded: boolean) {
    treeItem.hidden = expanded;
    treeItem.children.forEach(childNode => {
      this.setExpanded(childNode, expanded);
    });
  }

  // expand(event: any, treeItem: TreeNode<unknown>) {
  //     event.stopPropagation();
  //     treeItem.expanded = !treeItem.expanded;
  //     treeItem.children.forEach(childNode => {
  //         this.setExpanded(childNode, !treeItem.expanded);
  //     });
  // }

  expand(event: any, treeItem: TreeNode<unknown>) {
    event.stopPropagation();
    const expanded = !treeItem.expanded;
    treeItem.expanded = expanded;
    if (expanded) {
      treeItem.children.forEach(childNode => {
        if (this.isUnitTree) {
          childNode.expanded = false;
        }
        this.showChildren(childNode);
      });
    } else {
      treeItem.children.forEach(childNode => {
        this.hideChildren(childNode);
      });
    }
  }

  checkParents(treeItem: TreeNode<unknown>, key: string): void {
    const parentNode: TreeNode<unknown> = this.treeHashmap[(treeItem.data as any)['parent_id']];
    if (parentNode) {
      (parentNode.data as any)[key] =
        parentNode.children.every(childNode => (childNode.data as any)[key]);
      this.checkParents(parentNode, key);
    }
  }

  checkChildren(treeItem: TreeNode<unknown>, key: string, checked: boolean): void {

    if (treeItem.isFixed && treeItem.isFixed.hasOwnProperty(key)) {
      if (treeItem.isFixed[key] === true) {
        // if(treeItem.data.code === "MAP_3D" || treeItem.data.code === "MAP_2D"){
        //     console.log("check tree item", treeItem, checked,key);
        // }
        return;
      }
    }
    (treeItem.data as any)[key] = checked;
    treeItem.children.forEach(childNode => {
      this.checkChildren(childNode, key, checked);
    });
  }

  check(event: any, columnConfig: TreeTableColumnConfig, treeItem: TreeNode<unknown>) {
    event.stopPropagation();
    // console.log("Check treeitem", treeItem);
    // console.log("Fixed Read List", this.treeTableConfig.fixedReadList);
    // console.log("Fixed Ops List", this.treeTableConfig.fixedOpsList);
    const checked = (event.target as HTMLInputElement)?.checked;
    (treeItem.data as any)[columnConfig.key] = checked;
    if (columnConfig?.checkboxVerticalCascade) {
      this.checkChildren(treeItem, columnConfig.key, checked);
      this.checkParents(treeItem, columnConfig.key);
    }
  }
}
