import { VgTreeNode } from './vg-tree-node';

export type VgTreeNodeCheckboxEvent = {
  key: string;
  checked: boolean;
  node: VgTreeNode<unknown>;
};
