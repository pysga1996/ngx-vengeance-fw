import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TreeTableColumnConfig, TreeTableConfig} from "../../model/tree-table-config";
import {TreeNode} from "../../model/tree-node";


@Component({
    selector: 'ngx-high-performance-tree-table',
    templateUrl: './high-performance-tree-table.component.html',
    styleUrls: ['./high-performance-tree-table.component.scss'],
})
export class HighPerformanceTreeTableComponent implements OnChanges {

    @Input() treeTableConfig: TreeTableConfig = {
        columns: [],
    };
    @Input() treeItems: TreeNode<unknown>[] = [];
    @Input() parentIdKey: string = 'parent_id';
    treeHashmap: { [key: string]: TreeNode<unknown> } = {};
    sortedNodeList: TreeNode<unknown>[] = [];
    selectedNode: TreeNode<unknown> | undefined;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.treeItems) {
            const nodeList: TreeNode<unknown>[] = [];
            const seqObj = {sequence: 0};
            const level = 0;
            const paddingBlock = {[level]: true};
            this.treeItems.forEach((node, i) => {
                node.paddingBlock = {...paddingBlock};
                seqObj.sequence++;
                this.processTreeSequenceAndLevel(node, nodeList, seqObj, level,
                    node.paddingBlock, i === node.children.length - 1);
            });
            nodeList.sort((a, b) => a.sequence - b.sequence);
            this.sortedNodeList = nodeList;
        }
    }

    processTreeSequenceAndLevel(node: TreeNode<unknown>, nodeList: TreeNode<unknown>[],
                                seqObj: { sequence: number }, level: number,
                                parentPaddingBlock: { [key: string]: boolean }, isLastChild: boolean): void {
        node.sequence = seqObj.sequence;
        node.level = level++;
        node.paddingBlock = {
            ...parentPaddingBlock,
            [level - 1]: !isLastChild,
            [level]: true,
        };
        nodeList.push(node);
        node.children.forEach((childNode, i) => {
            seqObj.sequence++;
            this.processTreeSequenceAndLevel(childNode, nodeList, seqObj, level,
                node.paddingBlock, i === node.children.length);
        });
    }

    selectRow(treeItem?: TreeNode<unknown>) {
      this.selectedNode = treeItem;
    }

    setExpanded(treeItem: TreeNode<unknown>, expanded: boolean) {
        treeItem.hidden = expanded;
        treeItem.children.forEach(childNode => {
            this.setExpanded(childNode, expanded);
        });
    }

    expand(event: any, treeItem: TreeNode<unknown>) {
        event.stopPropagation();
        treeItem.expanded = !treeItem.expanded;
        treeItem.children.forEach(childNode => {
            this.setExpanded(childNode, !treeItem.expanded);
        });
    }

    checkParents(treeItem: TreeNode<unknown>, key: string): void {
        const parentNode: TreeNode<unknown> = this.treeHashmap[(treeItem.data as any)[this.parentIdKey]];
        if (parentNode) {
            (parentNode.data as any)[key] =
                parentNode.children.every(childNode => (childNode.data as any)[key]);
            this.checkParents(parentNode, key);
        }
    }

    checkChildren(treeItem: TreeNode<unknown>, key: string, checked: boolean): void {
        (treeItem.data as any)[key] = checked;
        treeItem.children.forEach(childNode => {
            this.checkChildren(childNode, key, checked);
        });
    }

    check(event: any, columnConfig: TreeTableColumnConfig, treeItem: TreeNode<unknown>) {
        event.stopPropagation();
        const checked = (event.target as HTMLInputElement)?.checked;
        (treeItem.data as any)[columnConfig.key] = checked;
        if (columnConfig?.checkboxVerticalCascade) {
            this.checkChildren(treeItem, columnConfig.key, checked);
            this.checkParents(treeItem, columnConfig.key);
        }
    }
}
